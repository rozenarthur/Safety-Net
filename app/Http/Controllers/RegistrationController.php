<?php
/**
 * Controller for User Registration
 *
 * @author Ronald Mangiliman <ronjcanlas@gmail.com>
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Sentinel;
use Activation;
use App\User;
use ValidatePassword;
use Message;

class RegistrationController extends Controller
{
    /**
     * Registers user. Takes in HTTP request and type of user to be created.
     *
     * Example Expected Request:
     * {
     *  "first_name" : Ron,
     *  "last_name" : Mangiliman,
     *  "username" : ronjcanlas,
     *  "email" : ronjcanlas@gmail.com,
     *  "password" : Password1234@,
     *  "password_confirmation" : Password1234@,
     *  "type": admin
     * }
     *
     * And activation code is sent to the user's email. They will use this
     * to activate their account and create a new password. The password being passed in the
     * request is the temporary one created by admin.
     *
     * Registration should be initialized by an admin, following the design.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $this->validate($request, [
            'first_name' => 'required|string|regex:/^[a-zA-Z]*$/|', //Regex: Alphabetic characters only
            'last_name' => 'required|string|regex:/^[a-zA-Z]*$/|',
            'username' => 'required|string|unique:users,username|regex:/^[A-Za-z]{1}[A-Za-z0-9]{5,13}$/', //Regex: Alphanumeric, must start with letter, 6-14 in length
            'email' => 'required|string|email|unique:users,email',
            'password' => 'confirmed|required|string|min:8|max:18',
            'password_confirmation' => 'required|string|min:8|max:18',
            'type' => 'required'
        ]);
        $password = $request->input('password');

        if(!ValidatePassword::validatePass($password)) {
            return response()->json([
               'result' => 'fail',
               'message' => Message::$userMessages['PasswordIncorrectFormat']
            ], 422);
        }

        $user = Sentinel::register($request->all());
        $activation = Activation::create($user);
        $role = Sentinel::findRoleBySlug($request->type);
        $role->users()->attach($user);
        \SafetyNetMailer::sendEmail($user->email, "Activate your Safety Net account.", 'emails.activation',
                                    $user, $activation->code);
//        $this->sendEmail($user, $activation->code);

        if($user) {
            $result = 'success';
            $message = Message::registrationSuccessMessage($request->type);
        } else {
            $result = 'fail';
            $message = Message::$registrationMessages['RegisterFail'];
        }

        return response()->json([
            'result' => $result,
            'message' => $message
        ]);
    }
}

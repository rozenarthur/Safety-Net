<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\PasswordRequest;
use App\User;
use Reminder;
use ValidatePassword;
use Message;

class ForgotPasswordController extends Controller
{
    /**
     * Function that sends a password reset request to administrator
     *
     * First checks to see if input entered is an email associated with a user in database.
     * Whether or not is valid, it will return a message saying that an email has been sent.
     *
     * If it is valid, then a password request will be created for that user.
     *
     * Example Request:
     * {
     *  "email" : "ronjcanlas@gmail.com"
     * }
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgotPassword(Request $request) {
        $user = User::where('email',$request->input('email'))->first();
        if(!$user) {
            $message = Message::$userMessages['UserNotFound'];
        } else {
            Reminder::create($user);
            $message = Message::$forgotPasswordMessages['ForgotRequestSent'];
//            \SafetyNetMailer::adminEmailNotification("Review $user->first_name's password reset request.",
//                'emails.pw-change-request',$user);
        }
        return response()->json([
            'message' => $message
        ]);
    }

    /**
     * Returns all reset password requests for administrator to view.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function showRequests() {
        $requests = Reminder::all();

        if(count($requests) === 0) {
            return response()->json([
                'message' => Message::$forgotPasswordMessages['ForgotNoRequests']
            ]);
        } else {
            return $requests;
        }
    }

    /**
     * Retrieves single request and returns it
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showRequest($id) {
        $request = Reminder::find($id);

        if(count($request) === 0) {
            return response()->json([
                'message' => Message::$forgotPasswordMessages['ForgotRequestNotFound']
            ]);
        } else {
            return $request;
        }
    }

    /**
     * Function to create password reset for the user.
     * Initialized by administrator.
     * This will send a link to the user's email that will redirect them
     * to the password reset page.
     *
     * Example request:
     *
     * {
     *  "user_id" : 1
     * }
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function approveRequest(Request $request) {
        $user = User::find($request->input('user_id'));
        $reminder = Reminder::exists($user);
        \SafetyNetMailer::sendEmail($user->email, "$user->first_name, your reset password request has been approved.",
                                    'emails.forgot-password', $user, $reminder->code);
//        $this->sendEmail($user, $reminder->code, 'approved');

        return response()->json([
            'message' => "A reset code has been sent to the $user->first_name's email."
        ]);
    }

    /**
     * Function to deny password reset request
     *
     * This will send an email to the user's email informing them that
     * their request was denied.
     *
     * Example request:
     *
     * {
     *  "user_id" : 2
     * }
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function denyRequest(Request $request) {
        $user = User::find($request->input('user_id'));
        $reminder = Reminder::exists($user);
        $reminder->delete();
        \SafetyNetMailer::sendEmail($user->email, "$user->first_name, your reset password request has been denied.",
                                    'emails.denied', $user, $reminder->code);
//        $this->sendEmail($user, $reminder->code, 'denied');
        return response()->json([
            'message' => "A denial message has been sent to $user->first_name's email."
        ]);
    }

    /**
     * Function that resets a user's password.
     *
     * User enters a new password. If this passes all validation, then
     * the user's password will be reset.
     *
     * Example request:
     * {
     *  "password" : Password4321@
     *  "password_confirmation" : Password4321@
     * }
     *
     * @param Request $request
     * @param $email
     * @param $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request, $email, $code) {
        $user = User::where('email', $email)->first();

        $this->validate($request, [
            'password' => 'confirmed|required|string|min:8|max:18',
            'password_confirmation' => 'required|string|min:8|max:18'
        ]);

        if(!ValidatePassword::validatePass($request->input('password'))) {
            return response()->json([
                'message' => Message::$userMessages['PasswordIncorrectFormat']
            ]);
        }

        if(count($user) == 0) {
            return response()->json([
               'message' => Message::$userMessages['UserNotFound']
            ]);
        }

        if($reminder = Reminder::exists($user)) {
            if($code == $reminder->code) {
                Reminder::complete($user, $code, $request->input('password'));
                return response()->json([
                    'message' => Message::$forgotPasswordMessages['PasswordResetSuccess']
                ]);
            } else {
                return response()->json([
                   'message' => Message::$forgotPasswordMessages['PasswordResetError']
                ]);
            }
        } else {
            return response()->json([
               'message' => Message::$forgotPasswordMessages['ForgotNoExistingRequest']
            ]);
        }
    }

//    private function sendEmail($user, $code, $type) {
//
//        if($type === 'approved') {
//            $view = 'emails.forgot-password';
//        } elseif($type === 'denied') {
//            $view = 'emails.denied';
//        }
//
//        Mail::send($view, [
//            'user' => $user,
//            'code' => $code
//        ], function ($message) use ($user, $type) {
//            $message->from('foobarhelper@gmail.com', 'Foo Bar Software');
//            $message->to($user->email);
//            $message->subject("$user->first_name, your reset password request has been $type.");
//        });
//    }
}

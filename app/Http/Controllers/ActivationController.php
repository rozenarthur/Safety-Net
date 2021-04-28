<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Activation;
use Message;

class ActivationController extends Controller
{
    /**
     * Function used to activate the user.
     *
     * Expects a JSON request with input values username and code.
     *
     * Example Request:
     *
     * {
     *  "username" : ronjcanlas,
     *  "password" : password,
     *  "code" : IATUZYOpPXopF1didWF5JyGoYfuy0YyH
     * }
     *
     * Function then attempts to activate user.
     * This will return a JSON specifying whether or not activation was successful.
     *
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function activate(Request $request)
    {
        $username = $request->input('username');
        $code = $request->input('code');
        $password = $request->input('password');
        if(!$user = User::where('username', $username)->first()) {
            return response()->json([
                'message' => Message::$activationMessages['ActivationFail']
            ], 422);
        }
        if (password_verify($password, $user->password) && Activation::complete($user, $code)) {
            $user->completed = 1;
            $user->save();
            return response()->json([
                'message' => Message::$activationMessages['ActivationSuccess']
            ]);
        } else {
            return response()->json([
                'message' => Message::$activationMessages['ActivationFail']
            ], 422);
        }
    }
}

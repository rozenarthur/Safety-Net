<?php

namespace App\Http\Controllers;


use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Throttle;
use Illuminate\Database\Eloquent\Model;
use Mockery\Exception;
use ValidatePassword;
use Message;
use DB;

//TODO: Check for edge cases. (Just in case the functions fail.)
class UsersController extends Controller
{
    //Retrieves a list of all users
    public function index()
    {
        if ($users = User::all()) {
            foreach ($users as $user) {
                $user['role'] = Sentinel::findById($user->id)->roles()->get();
            }
            return $users;
        } else {
            return response()->json([
                'message' => Message::$userMessages['NoUsers']
            ]);
        }

    }

    //Retrieves a specific user
    public function show($user_id)
    {
        if ($user = User::find($user_id)) {
            return $user;
        } else {
            return response()->json([
                'message' => Message::$userMessages['UserNotFound']
            ]);
        }
    }

    //Update a specific user
    public function edit(Request $request, $user_id)
    {
        if ($user = User::find($user_id)) {
            $user->update($request->all());
            $user->save();
            return response()->json([
                'message' => Message::$userMessages['UserInfoChangeSuccess']
            ]);
        } else {
            return response()->json([
                'message' => Message::$userMessages['UserNotFound']
            ]);
        }
    }

    //Delete a user
    public function destroy($user_id)
    {
        if ($user = User::find($user_id)) {
            $user->delete();
            return response()->json([
                'message' => Message::$userMessages['AccountDeleted']
            ]);
        } else {
            return response()->json([
                'message' => Message::$userMessages['UserNotFound']
            ]);
        }
    }

    //Unlocks a locked user
    public function unlock($user_id)
    {
        if ($user = User::find($user_id)) {
            try {
                if($throttle = Throttle::find($user_id)) {
                    $throttle->delete();
                }
                $user->locked = 0;
                $user->save();
                $user['role'] = Sentinel::findById($user->id)->roles()->get();
                return response()->json([
                    'message' => Message::$userMessages['AccountUnlocked'],
                    'user' => $user
                ]);
            } catch (Exception $exception) {
                $user->locked = 0;
                $user->save();
                $user['role'] = Sentinel::findById($user->id)->roles()->get();
                return response()->json([
                    'message' => Message::$userMessages['AccountUnlocked'],
                    'user' => $user
                ]);
            }

        } else {
            return response()->json([
                'message' => Message::$userMessages['UserNotFound']
            ], 422);
        }
    }

    public function lock($user_id) {
        if ($user = User::find($user_id)) {
            $user->locked = 1;
            $user->save();
            $user['role'] = Sentinel::findById($user->id)->roles()->get();
            return response()->json([
                'message' => Message::$userMessages['AccountLocked'],
                'user' => $user
            ]);
        } else {
            return response()->json([
                'message' => Message::$userMessages['UserNotFound']
            ], 422);
        }
    }

    /**
     * Function to change user's password.
     * Takes in user's old password, new password, and new password confirmation.
     *
     * Example request:
     *
     * {
     *  "old_password" : Password1234@,
     *  "password" : Password4321@,
     *  "password_confirmation" : Password4321@,
     * }
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {
        if (!$user = Sentinel::getUser()) {
            return response()->json([
                'message' => Message::$userMessages['UserNotFound']
            ]);
        }

        $this->validate($request, [
            'old_password' => 'required|string',
            'password' => 'confirmed|required|string|min:8|max:18',
            'password_confirmation' => 'required|string|min:8|max:18'
        ]);

        $hasher = Sentinel::getHasher();
        $password = $request->input('password');
        $oldPassword = $request->input('old_password');

        if (ValidatePassword::validatePass($password) && $hasher->check($oldPassword, $user->password)) {
            $updatedUser = Sentinel::update($user, [
                'password' => $password,
                'last_password_update' => date('Y-m-d'),
                'password_expiration' => date('Y-m-d', strtotime('+6 months'))
            ]);
            $message = Message::$forgotPasswordMessages['PasswordChangeSuccess'];
        } else {
            return response()->json([
                'message' => Message::$forgotPasswordMessages['PasswordChangeFailure']
            ], 422);
        }
        return response()->json([
            'message' => $message,
            'last_password_update' => $updatedUser->last_password_update,
            'password_expiration' => $updatedUser->password_expiration
        ]);
    }

    /**
     * Function to check if user's password has expired.
     *
     * Returns message if expired, else returns expiration date for user's password.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkPasswordExp()
    {
        if (!$user = Sentinel::getUser()) {
            return response()->json([
                'message' => Message::$userMessages['UserNotFound']
            ]);
        }
        $exp = $user->password_expiration;

        if (strtotime($exp) < time()) {
            return response()->json([
                'message' => Message::$userMessages['PasswordReset']
            ]);
        } else {
            return response()->json([
                'message' => $exp
            ]);
        }
    }

    public function check()
    {
        if ($user = Sentinel::getUser()) {
            $user['security_questions'] = $user->securityQuestions()
                ->where('is_set', 1)
                ->where('is_approved', 1)
                ->select('id', 'security_question')
                ->get();
            $user['count'] = count($user['security_questions']);
        }
        return response()->json([
            'message' => $user
        ]);
    }

    /**
     * Function that returns the amount of total users, activated users, locked users, pending users, and admins
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsersStatistics()
    {
        $users = DB::table('users');
        $numUsers = $users->count();
        $numActivated = $users->where('completed', 1)->count();
        $numLocked = $users->where('locked', 1)->count();
        $roles = DB::table('role_users');
        $numAdmins = $roles->where('role_id', 1)->count();

        return response()->json([
            'registered' => $numUsers,
            'activated' => $numActivated,
            'locked' => $numLocked,
            'admins' => $numAdmins,
            'pending' => $numUsers - $numActivated
        ]);
    }
}


<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Sentinel;
use Cartalyst\Sentinel\Checkpoints\ThrottlingException;
use Cartalyst\Sentinel\Checkpoints\NotActivatedException;
use Message;
use App\SecurityQuestion;

class LoginController extends Controller
{
    /**
     * Function used to begin authentication and retrieve user's security questions.
     * Returns user's security questions if successful, or JSON with amount of Security Questions that the user has set.
     *
     * The function first checks to see if the user is already logged in, if so, then a response will be sent back
     * saying so.
     *
     * Example Request:
     *
     * {
     *  username: ronjcanlas,
     *  password: Password1234!
     * }
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request) {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
        ]);
        if($user = Sentinel::check()) {
            return response()->json([
                'result' => 'failcheck',
               'message' => Message::loggedInAsMessage($user->username)
            ], 422);
        } else {
            try {
                $user = Sentinel::authenticate($request->all());
            } catch(ThrottlingException $e) {
                $delay = $e->getDelay();
                return response()->json([
                    'message' => Message::throttlingErrorMessage($delay)
                ], 403);
            } catch(NotActivatedException $e) {
                return response()->json([
                    'message' => Message::$loginMessages['LoginNotActivated']
                ], 422);
            }
        }
        if(!$user) {
            return response()->json([
                'result' => 'faildoesntexist',
               'message' => Message::$loginMessages['LoginFail']
            ], 422);
        }
        if($user->completed === 0) {
            return response()->json([
                'result' => 'notSetUp',
                'message' => Message::$loginMessages['LoginNotSetUp']
            ], 422);
        }
        $questions = $user->securityQuestions()
                                ->where('is_set', 1)
                                ->where('is_approved', 1)
                                ->select('id', 'security_question')
                                ->get();
        $count = count($questions);
        Sentinel::logout();
        return response()->json([
            'security_questions' => $questions,
            'count' => $count
        ]);

//        if(($count = count($questions)) < 3) {
//            return response()->json([
//                'result' => 'setSQ',
//               'count' => $count
//            ]);
//        } else {
//            Sentinel::logout(); //logout because they need to be asked their security questions
////            $questions['count'] = $count;
//            $questions['success'] = 'success';
//            return $questions;
//        }
    }

    /**
     * Function used to authenticate user
     * Takes in three security questions and their username and password.
     *
     * If all credentials entered are correct, then the system will attempt to log the user in.
     *
     * Example Request:
     * {
     *  username: ronjcanlas,
     *  password: Password1234!
     *  security_questions: [
     *      {
     *          id: 2,
     *          answer: Dogs
     *      },
     *      {
     *          id: 12,
     *          answer: Lodi High School
     *      },
     *      {
     *          id: 23,
     *          answer: Purple
     *      }
     *  ]
     * }
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(Request $request) {
        $json = $request->all();
        //Find number of security questions in JSON request
        $count = count($json['security_answers']);
        $user = User::where('username', $json['username'])->first();
        //Find number of security questions that user should be asked
        $numSetSQ = $user->securityQuestions()
                            ->where('is_set', 1)
                            ->where('is_approved', 1)
                            ->get();
        //Compare number of questions in JSON request with number of set security questions.
        if(!$user || ($count !== count($numSetSQ))) {
            return response()->json([
               'message' => Message::$loginMessages['LoginFail']
            ], 422);
        }

        for ($i = 0; $i < $count; $i++) {
            $sq = SecurityQuestion::find($json['security_answers'][$i]['id']);
            $hash = $sq->security_answer;
            $answer = $json['security_answers'][$i]['answer'];
            if (!password_verify($answer, $hash)) {
                return response()->json([
                    'message' => Message::$loginMessages['LoginFail']
                ], 422);
            }
        }
        try {
            Sentinel::authenticate($request->all());
            $user = Sentinel::check();
            if($user) {
                $user->locked = 0;
                $user['role'] = Sentinel::inRole('admin') ? 'admin' : 'user';
                $user['message'] = Message::$loginMessages['LoginSuccess'];
                return $user;
            } else {
                return response()->json([
                    'message' => Message::$loginMessages['LoginFail']
                ], 422);
            }
        } catch(ThrottlingException $e) {
            $user->locked = 1;
            $delay = $e->getDelay();
            return response()->json([
                'message' => Message::throttlingErrorMessage($delay)
            ], 403);
        } catch(NotActivatedException $e) {
            return response()->json([
                'message' => Message::$loginMessages['LoginNotActivated']
            ], 422);
        }
    }

    public function logout() {
        if(Sentinel::check()) {
            $user = Sentinel::logout();
            $user['message'] = Message::$loginMessages['LogoutSuccess'];
            return $user;
        } else {
            return response()->json([
                'message' => Message::$loginMessages['LogoutFail']
            ]);
        }
    }
}

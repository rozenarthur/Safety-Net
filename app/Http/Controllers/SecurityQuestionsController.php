<?php

namespace App\Http\Controllers;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\SecurityQuestion;
use App\User;
use Message;
use Validator;
use ValidatePassword;

class SecurityQuestionsController extends Controller
{

    //retrieves every single security question in database
    public function index(){
        $securityQuestion = SecurityQuestion::all();

        //checks if the json is not empty
        if ($securityQuestion){
            return $securityQuestion;
        }

        else
            return response()->json([
                'message' => 'No Security Questions in the system!'
            ]);
    }

    //retrieves all security questions of a particular user
    public function allUserSecurityQuestion($user_id){
        $questions = SecurityQuestion::where('user_id', $user_id)->get();

        if($questions) {
            return $questions;
        }

        else
            return response()->json([
                'message' => "This user doesn't have any Security Questions!"
            ]);
    }

    //retrieves specific security question of a user
    public function viewSecurityQuestion($sq_id)
    {
        $sq = SecurityQuestion::find($sq_id);
        if($sq){
            return $sq;
        }

        else
            return response()->json([
                'message' => 'This Security Question does not exist!'
            ]);
    }

    //allows the admin to change details of the security question
    public function editSecurityQuestion (Request $request, $sq_id){
        $sq = SecurityQuestion::find($sq_id);
        $check_approved = $sq->is_approved;
        if($sq) {
            $sq->update($request->all());
            $sq->is_approved = $check_approved; //sets is_approved back to original before edit
            $sq->save();

            $msg = 'The security Question was updated.';
            //toDO if json request coming in has a key called "is approved" give an error
        }

        else {
            $msg = 'An Error has occured! The security Question was not updated!';
        }
        return response()->json([
            'message' => $msg
            ]);
    }

    //allows the admin to delete a specific security question
    public function deleteSecurityQuestion ($sq_id){
        $sq = SecurityQuestion::find($sq_id);

        if($sq) {
            $sq->delete();
            $msg = 'The security Question was deleted.';
        }

        else {
            $msg = 'An Error has occured! The security Question was not Deleted!';
        }
        return response()->json([
            'message' => $msg]);
    }

    // compares the user's entered security question to the actual result
    public function answer(Request $request, $sq_id){
        $questions = SecurityQuestion::find($sq_id);
        $sq = $questions->security_answer;

        $input = $request->input('security_answer'); //gets the value entered
        $compare = password_verify($input, $sq);; //encrpyts the value entered

        if($compare){//compares the entered value to the value in the database
            $msg = 'Your answer is correct!';
        }
        else{
            $msg = 'Your answer is incorrect!';
        }

        return response()->json([
            'message' => $msg]);
    }

    //checks if the user has set three security questions
    public function check ($user_id){
        $user = User::find($user_id);
        if(!$user){
           return response()->json([
                'message' => "User does not Exist!"]);
        }

        $count = count($user->securityQuestions()->get());

        if($count < 3){
            $msg = "You need to have at least 3 Security Questions!";
        }

        else{
            $msg = "You have 3 Security Questions!";
        }

        return response()->json([
            'message' => $msg]);
    }

    /**
     * Function that adds an arbitrary amount of new security questions for a user
     *
     * Example Request:
     *
     * {
     *  security_question: What high school did you go to?,
     *  security_answer: Lodi High School,
     *  is_set: 1
     * }
     *
     * Can also have is_approved: 1 if the security question is premade.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    //toDO if json request coming in has a key called "is approved" give an error
    public function create(Request $request) {
        $user = Sentinel::check();
        if (!$user) {
            return response()->json([
               'message' => Message::$userMessages['UserNotFound']
            ]);
        }

        $questions = $request->all();

        foreach ($questions as $question) {
            $question['user_id'] = $user->id;
            if(!$sq = SecurityQuestion::create($question)) {
                $message = Message::$securityQuestionsMessages['SQCreateFail'];
            } else {
                $user->securityQuestions()->save($sq);
                $message = Message::$securityQuestionsMessages['SQCreateSuccess'];
                \SafetyNetMailer::adminEmailNotification("Review $user->first_name's security question request.",
                    'emails.sq-request',$user);
            }
        }

        return response()->json([
           'message' => $message
        ]);
    }
    //TODO send an email when the question is approved or dissaproved
    public function approve($sq_id) {
        $sq = SecurityQuestion::find($sq_id);

        if($sq){
            $sq->is_approved = 1;
            $sq->save();
            $finduser = $sq->user_id;
            $user = User::find($finduser);
            \SafetyNetMailer::sendEmailSQApproval($user->email,
                "Your Safety Net Security Question was Approved", 'emails.accepted-sq',
                    $user->first_name, $sq->security_question);
            $msg = Message::$securityQuestionsMessages['SQApprove'];
        }
        else{
            $msg = Message::$securityQuestionsMessages['SQNoChange'];
        }

        return response()->json([
            'message' => $msg
        ]);
    }

    public function deny($sq_id) {
        $sq = SecurityQuestion::find($sq_id);
        if($sq){
            $sq->is_approved = 0;
            $sq->save();
            $finduser = $sq->user_id;
            $user = User::find($finduser);

            \SafetyNetMailer::sendEmailSQApproval($user->email,
                "Your Safety Net Security Question was Denied", 'emails.denied-sq',
                $user->first_name, $sq->security_question);

            $msg = Message::$securityQuestionsMessages['SQDeny'];
        }
        else{
            $msg = Message::$securityQuestionsMessages['SQNoChange'];
        }

        return response()->json([
            'message' => $msg
        ]);
    }

    public function setup(Request $request) {

        $user = Sentinel::authenticate($request->login);
        if (!$user) {
            return response()->json([
                'message' => Message::$userMessages['UserNotFound']
            ]);
        }

        $validator = Validator::make($request->new_pass, [
            'old_password' => 'required|string',
            'password' => 'confirmed|required|string|min:8|max:18',
            'password_confirmation' => 'required|string|min:8|max:18'
        ]);

        if($validator->fails()) {
            Sentinel::logout();
        }

        $hasher = Sentinel::getHasher();
        $newPass = $request->new_pass;
        $password = $newPass['password'];
        $oldPassword = $newPass['old_password'];

        if(ValidatePassword::validatePass($password) && $hasher->check($oldPassword, $user->password)) {
            Sentinel::update($user, [
                'password' => $password,
                'last_password_update' => date('Y-m-d'),
                'password_expiration' => date('Y-m-d', strtotime('+6 months'))
            ]);
            $message = Message::$userMessages['PasswordChangeSuccess'];
        } else {
            Sentinel::logout();
            return response()->json([
                'message' => $message = Message::$userMessages['PasswordChangeError']
            ], 422);
        }

        $questions = $request->security_questions;

        foreach ($questions as $question) {
            $question['user_id'] = $user->id;
            if(!$sq = SecurityQuestion::create($question)) {
                Sentinel::logout();
                return response()->json([
                    'message' => $message = Message::$securityQuestionsMessages['SQCreateFail']
                ], 422);
            } else {
                $user->securityQuestions()->save($sq);
                $message = Message::$securityQuestionsMessages['SQCreateSuccess'];
//                \SafetyNetMailer::adminEmailNotification("Review $user->first_name's security question request.",
//                    'emails.sq-request',$user);
            }
        }

        Sentinel::logout();

        return response()->json([
            'message' => $message
        ]);
//        $user = Sentinel::check();
//        if (!$user) {
//            return response()->json([
//                'message' => Message::$userMessages['UserNotFound']
//            ]);
//        }
//        $questions = $request->all();
//        $question['user_id'] = $user->id;
//        foreach ($questions as $question) {
//            if(!$sq = SecurityQuestion::create($question)) {
//                return response()->json([
//                    'message' => Message::$securityQuestionsMessages['SQSetupFail']
//                ]);
//            } else {
//                $user->securityQuestions()->save($sq);
//            }
//        }
//        return response()->json([
//            'message' => Message::$securityQuestionsMessages['SQSetupSuccess']
//        ]);
    }
}


<?php

/**
 * Created by PhpStorm.
 * User: Ronald Mangiliman
 * Date: 2/23/2017
 * Time: 11:05 PM
 *
 * Class with static methods that can be used to send different types of emails.
 */

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class SafetyNetMailer
{
    /**
     * Function used to send email.
     *
     * @param $toEmail String Email address to send to
     * @param $subject String Subject of email
     * @param $view String View in emails folder in resource view that email will utilize
     * @param $user Object User whose data will be used in email
     * @param string $code String Optional parameter for when needing to send a code
     */
    public static function sendEmail($toEmail, $subject, $view, $user, $code = '') {
        Mail::send($view, [
            'user' => $user,
            'code' => $code
        ], function ($message) use ($user, $toEmail, $subject) {
            $message->from('foobarhelper@gmail.com', 'Foo Bar Software');
            $message->to($toEmail);
            $message->subject($subject);
        });
    }

    /**
     * Function that notifies all admins via email.
     *
     * @param $subject String Subject of email
     * @param $view String View in emails folder in resource view that email will utilize
     * @param $user Object User whose data will be used in email
     */
    public static function adminEmailNotification($subject, $view, $user) {
        //Query database for all admins.
        $admins = DB::table('users')
                        ->join('role_users', 'users.id', '=', 'role_users.user_id')
                        ->select('users.*', 'role_users.role_id')
                        ->where('role_id', 1)
                        ->get();
        //Loop through admins, sending each an email
        foreach($admins as $admin) {
            Mail::send($view, [
                'user' => $user,
                'admin' => $admin
            ], function ($message) use ($admin, $subject) {
                $message->from('foobarhelper@gmail.com', 'Foo Bar Software');
                $message->to($admin->email);
                $message->subject($subject);
            });
        }
    }

    /** Sends a email to a user if their security question approval status was changed */
    public static function sendEmailSQApproval($toEmail, $subject, $view, $user, $sq = '') {
        Mail::send($view, [
            'user' => $user,
            'sq' => $sq,
        ], function ($message) use ($user, $toEmail, $subject) {
            $message->from('foobarhelper@gmail.com', 'Foo Bar Software');
            $message->to($toEmail);
            $message->subject($subject);
        });
    }

}
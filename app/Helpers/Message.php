<?php

/**
 * Class Message
 *
 * Container for reusable messages to be sent back to front end via JSON
 *
 * May not be used.
 */

class Message {

    /**
     * Messages related to users
     * @var array
     */
    public static $userMessages = [
        'NoUsers'=>'No users found in the database.',
        'UserNotFound' => 'Could not find user.',
        'UserInfoChangeSuccess'=> 'User information was successfully updated',
        'PasswordChangeSuccess' => 'Password has successfully been changed.',
        'PasswordChangeError' => 'An error occurred while attempting to change your password.',
        'PasswordReset' => 'Password must be reset.',
        'PasswordIncorrectFormat' => 'Password is in incorrect format. Must be minimum 8 characters and contain at least of the following: uppercase letter, lowercase letter, number, and special character.',
        'AcountDeleted'=>'Account is deleted.',
        'AccountUnlocked'=>'Account is unlocked.',
        'AccountLocked'=>'Account is locked.'

    ];

    /**
     * Messages related to Activation
     * @var array
     */
    public static $activationMessages = [
        'ActivationSuccess' => 'Activation was successful. You may now log in with your credentials.',
        'ActivationFail' => 'Activation failed.'
    ];

    public static $forgotPasswordMessages = [
        'PasswordChangeSuccess' => 'Your password was successfully changed',
        'PasswordChangeFailure' => 'An error occurred while changing your password. Make sure your password is in the correct format: At least one
                                    capital letter, one number, and one special character. Also make sure your old password is correct.',
        'PasswordResetSuccess' => 'Password successfully reset.',
        'PasswordResetError' => 'An error occurred while trying to reset your password.',
        'ForgotRequestSent' => 'Your password reset request has been sent to the admin for review.',
        'ForgotNoRequests' => 'No password requests to display.',
        'ForgotRequestNotFound' => 'Could not find specified request.',
        'ForgotNoExistingRequest' => 'No requests for this user could be found.'
    ];

    public static $loginMessages = [
        'LoginSuccess' => 'Login was successful',
        'LoginFail' => 'Could not log you in.',
        'LoginNotActivated' => 'Your account is not activated. Please check your email for an activation code and activate the account.',
        'LogoutSuccess' => 'Logout was successful.',
        'LogoutFail' => 'There was an error logging you out.',
        'LoginNotSetUp' => 'Account must be set up.'
    ];

    public static $registrationMessages = [
        'RegisterFail' => 'User could not be registered.'
    ];

    public static $middlewareMessages = [
        'Admin' => 'You must be a admin to access this page.',
        'Login' => 'You must be logged in as either a user or admin to access this page.',
        'User' => 'Only regular users are allowed to do this.',
        'Visitor' => 'Only visitors can access this page.'
    ];

    public static $securityQuestionsMessages = [
        'SQCreateFail' => 'Could not create security question.',
        'SQCreateSuccess' => 'Security question successfully created.',
        'SQApprove' => 'The Security Question was approved',
        'SQNoChange' => 'An Error has occured! The Security Question approval was not changed!',
        'SQDeny' => 'The Security Question was denied!',
        'SQSetupFail' => 'Set up failed',
        'SQSetupSuccess' => 'Set up was a success'
    ];

    public static $siteMessages = [
        'SiteUploadSuccess' => 'Site successfully uploaded',
        'SiteUploadFail' => 'Site failed to upload'
    ];

    /**
     * Returns message of user logged in
     * @param $username
     * @return string
     */
    public static function loggedInAsMessage($username) {
        return "Already logged in as $username.";
    }

    /**
     * Returns throttling error message.
     * @param $delay
     * @return string
     */
    public static function throttlingErrorMessage($delay) {
        return "Too many failed login attempts. Your account has been locked for $delay seconds. Please notify admin to unlock your account.";
    }

    public static function registrationSuccessMessage($type) {
        return "User was successfully registered as $type. Please have user activate account to login.";
    }

}
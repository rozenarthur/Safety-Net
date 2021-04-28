<?php

class ValidatePassword {
    /**
     * Using a single regex is too difficult to validate password, so this function does it in parts.
     *
     * Specified rules:
     *  1) Contain at least (1) uppercase letter
     *  2) Contain at least (1) lowercase letter
     *  3) Contain at least (1) number
     *  4) Contain at least (1) special character
     *
     * Length is already checked in validate.
     *
     * @param $password String password to validate
     * @return bool
     */
    public static function validatePass($password) {

        if(preg_match('/[A-Z]/', $password) === 0) {return false;} //Uppercase letter
        if(preg_match('/[a-z]/', $password) === 0) {return false;} //Lowercase letter
        if(preg_match('/\d/', $password) === 0) {return false;} //Number
        if(preg_match('/[\'\/~`\!@#\$%\^&\*\(\)_\-\+=\{\}\[\]\|;:"\<\>,\.\?\\\]/', $password) === 0) {return false;} //Special character
        return true;
    }
}
<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

use App\UserSites;
use Cartalyst\Sentinel\Sentinel;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    $credentials = [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'username' => $faker->userName,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = password_hash('password', PASSWORD_DEFAULT),
        'password_expiration' => $faker->date('Y-m-d', $max = '+6 months'),
        'last_password_update' => $faker->date('Y-m-d', $max = 'now'),
        'last_login' => $faker->dateTime($max = 'now', $timezone = date_default_timezone_get()),
        'completed' => 1,
        'locked' =>$faker->numberBetween(0, 1)
    ];

    Sentinel::registerAndActivate($credentials);
});

$factory->define(App\SecurityQuestion::class, function (Faker\Generator $faker) {
   static $answer;

    return [
        'security_question' => $faker->sentence($nbWords = 6, $variableNbWords = true),
        'security_answer' => $answer ?: $answer = 'answer',
        'user_id' => App\User::all()->except(1)->random()->id,
        'is_approved' => $faker->boolean(),
        'is_set' => $faker->boolean(),
   ];
});

$factory->define(App\Site::class, function(Faker\Generator $faker) {

    return [
        'site_name' => $faker->word,
        'site_path' => $faker->url
    ];
});


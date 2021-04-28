<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Faker\Factory as Faker;
use App\SecurityQuestion;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        //Create two site roles
        App\Role::create([
            'slug' => 'admin',
            'name' => 'Admin',
            'permissions' => [],
        ]);
        App\Role::create([
            'slug' => 'user',
            'name' => 'User',
            'permissions' => [],
        ]);

        factory(App\Site::class, 5)->create();

        static $password;

        $admin = [
            'first_name' => 'Admin',
            'last_name' => 'Administrator',
            'username' => 'adminaccount',
            'email'    => 'admin@foobar.com',
            'password' => 'Password1234@',
            'password_expiration' => Carbon::now()->addMonths(6),
            'last_password_update' => Carbon::now(),
            'last_login' => Carbon::now(),
            'completed' => 1,
            'locked' => 0
        ];

        $adminAccount = Sentinel::registerAndActivate($admin);
        $adminRole = Sentinel::findRoleBySlug('admin');
        $adminAccount->roles()->attach($adminRole);
        $current_time = \Carbon\Carbon::now()->toDateTimeString();
        $adminAccount->sites()->attach([App\Site::all()->random()->id => [
            'pin' => bcrypt('123456'),
            'created_at' => $current_time,
            'updated_at' => $current_time,
        ]]);

        static $answer;

        for ($i = 0; $i < 3; $i++) {
            $fakeSQ = [
                'security_question' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'security_answer' => $answer ?: $answer = 'answer',
                'user_id' => $adminAccount->id,
                'is_approved' => 1,
                'is_set' => 1,
            ];
            SecurityQuestion::create($fakeSQ);
        }



        for($i = 0; $i < 20; $i++) {

            static $password;
            $user = [
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'username' => $faker->userName,
                'email' => $faker->unique()->safeEmail,
                'password' => 'Password1234@',
                'password_expiration' => Carbon::now()->addMonths(6),
                'last_password_update' => Carbon::now(),
                'last_login' => $faker->dateTime($max = 'now', $timezone = date_default_timezone_get()),
                'completed' => 1,
                'locked' =>$faker->numberBetween(0, 1)
            ];

            $newUser = Sentinel::registerAndActivate($user);
            $userRole = Sentinel::findRoleBySlug('user');
            $newUser->roles()->attach($userRole);
            $current_time = \Carbon\Carbon::now()->toDateTimeString();
            $newUser->sites()->attach([App\Site::all()->random()->id => [
                'pin' => bcrypt('123456'),
                'created_at' => $current_time,
                'updated_at' => $current_time,
            ]]);
        }



        //Fill database with dummy data
        //TODO: Users inserted are NOT activated. Modify seeder to randomly activate users.
//        factory(App\User::class, 20)->create()->each(function ($user) {
//            //TODO: Fix to have generate true many to many relationships.
//            $current_time = \Carbon\Carbon::now()->toDateTimeString();
//            $user->roles()->attach(App\Role::all()->random()->id);
//            $user->sites()->attach([App\Site::all()->random()->id => [
//                'pin' => bcrypt('123456'),
//                'created_at' => $current_time,
//                'updated_at' => $current_time,
//            ]]);
//        });
        factory(App\SecurityQuestion::class, 50)->create();
        factory(App\Site::class, 5)->create();
    }
}

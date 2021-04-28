<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

//TODO: Place back into admin middleware
Route::post('/register', 'RegistrationController@register');
Route::post('/create-sq', 'SecurityQuestionsController@create'); //TODO: Move back to logged in middleware
Route::get('/check', 'UsersController@check');
Route::post('/setup', 'SecurityQuestionsController@setup');



Route::group(['middleware' => 'visitor'], function () {
    Route::post('/login', [ 'as' => 'login', 'uses' => 'LoginController@login']);
    Route::post('/authenticate', 'LoginController@authenticate');
    Route::post('/activate', 'ActivationController@activate');
    Route::post('/forgot', 'ForgotPasswordController@forgotPassword');
    Route::post('/reset/{email}/{code}', 'ForgotPasswordController@resetPassword');
    Route::get('/approvesq/{sq_id}', 'SecurityQuestionsController@approve');
    Route::get('/denysq/{sq_id}', 'SecurityQuestionsController@deny');
});

Route::group(['middleware' => 'admin'], function (){
    //Place all route only accessible to admins here!
    Route::get('/users', 'UsersController@index');
	Route::get('/users/{id}', 'UsersController@show');
	Route::put('/users/{id}', 'UsersController@edit');
    Route::get('/site', 'SitesController@index');
	Route::get('/site/{id}', 'SitesController@show');
	Route::post('/site', 'SitesController@store');
	Route::put('/site/{id}', 'SitesController@edit');
	Route::delete('/site/{id}', 'SitesController@destroy');
    Route::get('/forgot','ForgotPasswordController@showRequests');
    Route::get('/forgot/{id}', 'ForgotPasswordController@showRequest');
    Route::post('/approve','ForgotPasswordController@approveRequest');
    Route::post('/deny', 'ForgotPasswordController@denyRequest');
    Route::get('/sq', 'SecurityQuestionsController@index');
    Route::delete('/users/unlock/{id}','UsersController@unlock');
    Route::put('/users/lock/{id}','UsersController@lock');
    Route::delete('/users/{id}', 'UsersController@destroy');
    Route::get('stats', 'UsersController@getUsersStatistics');
});

Route::group(['middleware'=>'login'],function(){
	//Routes for all functions that including logging into the system
	Route::delete('/users/unlock/{id}','UsersController@unlock');
	Route::delete('/users/{id}', 'UsersController@destroy');
	Route::get('/checksq/{user_id}', 'SecurityQuestionsController@check');
	Route::post('/sq/{sq_id}', 'SecurityQuestionsController@answer');
	Route::delete('/sq/{sq_id}', 'SecurityQuestionsController@deleteSecurityQuestion');
	Route::get('/sq/{user_id}', 'SecurityQuestionsController@allUserSecurityQuestion');
    Route::get('/viewsq/{sq_id}', 'SecurityQuestionsController@viewSecurityQuestion');
    Route::put('/sq/{sq_id}', 'SecurityQuestionsController@editSecurityQuestion');
    Route::put('/change-pass', 'UsersController@changePassword');
    Route::get('/check-pass', 'UsersController@checkPasswordExp');
    Route::post('/logout', 'LoginController@logout');

});


Route::group(['middleware' => 'user'], function (){
   //Place all routes only accessible by a regular user here!
});
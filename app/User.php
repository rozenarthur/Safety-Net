<?php

namespace App;

use Cartalyst\Sentinel\Users\EloquentUser;
use Illuminate\Notifications\Notifiable;

class User extends EloquentUser
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password','username',
        'password_expiration', 'last_password_update', 'completed',
        'locked'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $attributes = [
        'completed' => 0,
        'locked' => 0
    ];

    /**
     * Mutator that sets password to be encrypted
     *
     * @param $value String password to be encrypted
     */
//    public function setPasswordAttribute($value) {
//        $this->attributes['password'] = bcrypt($value);
//    }

    /**
     * Mutator that capitalizes the first letter of first name
     * @param $value
     */
    public function setFirstNameAttribute($value) {
        $this->attributes['first_name'] = ucfirst($value);
    }

    /**
     * Mutator that capitalizes the first letter of last name
     * @param $value
     */
    public function setLastNameAttribute($value) {
        $this->attributes['last_name'] = ucfirst($value);
    }

    /**
     * Returns Security Questions associated with User - One to many relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function securityQuestions() {
        return $this->hasMany('App\SecurityQuestion');
    }

    /**
     * Returns Roles associated with User - Many to many relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles() {
        return $this->belongsToMany('App\Role', 'role_users');
    }

    /**
     * Returns Sites associated with User - Many to many relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function sites() {
        return $this->belongsToMany('App\Site', 'user_sites')
            ->withPivot('pin');
    }

    public function throttle(){
        return $this->hasMany('App\Throttle');
    }

}
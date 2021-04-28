<?php

namespace App;

use Cartalyst\Sentinel\Roles\EloquentRole;
use Illuminate\Database\Eloquent\Model;

class Role extends EloquentRole
{
    protected $fillable = [
      'slug', 'name', 'permissions'
    ];

//    /**
//     * Returns all Users associated with Role - Many to Many relationship
//     *
//     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
//     */
////    public function users() {
////        return $this->belongsToMany('App\User', 'role_users');
////}
}

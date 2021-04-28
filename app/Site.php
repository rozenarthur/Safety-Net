<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    protected $fillable = [
        'site_name', 'site_path'
    ];

    /**
     * Returns Users associated with Site - Many to many relationship
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users() {
        return $this->belongsToMany('App\User', 'user_sites')
            ->withPivot('pin');
    }
}

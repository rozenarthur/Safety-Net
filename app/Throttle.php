<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Throttle extends Model
{
	protected $table = 'throttle';

    public function user() {
        return $this->belongsTo('App\User');

    }
}

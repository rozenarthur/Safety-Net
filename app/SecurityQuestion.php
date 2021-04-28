<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SecurityQuestion extends Model
{
    protected $fillable = [
        'security_question', 'security_answer', 'user_id',
        'is_approved', 'is_set'
    ];

    protected $attributes = [
      'is_approved' => 0
    ];

    /**
     * Encrypts security question answer
     * @param $value
     */
    public function setSecurityAnswerAttribute($value) {
        $this->attributes['security_answer'] = bcrypt($value);
    }

    /**
     * Returns User that Question belongs to - Inverse of the One to Many relationship
     * defined in User model.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user() {
        return $this->belongsTo('App\User');
    }
}

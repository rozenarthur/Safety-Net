<?php

namespace App\Http\Middleware;

use Closure;
use Sentinel;
use Message;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     * User must be logged in and have a role of an admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Sentinel::check() && Sentinel::getUser()->roles()->first()->slug == 'admin') {
            return $next($request);
        } else {
            return response()->json([
               'message' => Message::$middlewareMessages['Admin']
            ]);
        }
    }
}

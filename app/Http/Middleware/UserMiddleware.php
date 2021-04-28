<?php

namespace App\Http\Middleware;

use Closure;
use Sentinel;
use Message;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        {
            if (Sentinel::check() && Sentinel::getUser()->roles()->first()->slug == 'user') {
                return $next($request);
            } else {
                return response()->json([
                    'message' => Message::$middlewareMessages['User']
                ]);
            }
        }
    }
}

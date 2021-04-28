<?php

namespace App\Http\Middleware;

use Closure;
use Sentinel;
use Message;

class VisitorMiddleware
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
            if (Sentinel::check()) {
                return response()->json([
                    'message' => Message::$middlewareMessages['Visitor']
                ], 422);
            } else {
                return $next($request);
            }
        }
    }
}

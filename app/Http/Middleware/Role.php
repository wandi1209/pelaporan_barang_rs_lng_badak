<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Auth::check()) {
            return redirect('/');
        }

        $roles = array_slice(func_get_args(), 2);

        foreach ($roles as $role) {
            if(Auth::user()->role == $role) {
                return $next($request);
            }
        }

        return redirect('/login');
    }
}

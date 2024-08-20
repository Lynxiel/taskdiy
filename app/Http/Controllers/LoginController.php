<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class LoginController extends Controller
{

    protected function guard($guard = 'web')
    {
        return Auth::guard($guard);
    }

    

    /**
     * Handle an authentication attempt.
     */
    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(auth('sanctum')->user());
        }
        
        return response()->json([
            'errors' => [
                'email' => 'The provided credentials do not match our records.'],
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        
    }

    public function check()
    {
        if (auth('sanctum')->check()) {
            return response()->json(auth('sanctum')->user());
        }
        return response()->json(null);
    }

    public function logout()
    {
        if (auth('sanctum')->check()) {
            Auth::logout();
        }
    }
}
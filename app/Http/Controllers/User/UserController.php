<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function login()
    {
        // Trova l'utente admin (email hardcoded come esempio)
        $admin = User::where('email', 'admin@example.com')->first();

        if (!$admin) {
            abort(Response::HTTP_FORBIDDEN, 'Admin non trovato');
        }

        // Simula il login
        Auth::login($admin);
    }

    public function logout()
    {
        Auth::logout();
    }
}

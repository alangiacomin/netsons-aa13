<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

/**
 * @group User
 */
class UserController extends Controller
{
    public function loginFake()
    {
        // Trova l'utente admin (email hardcoded come esempio)
        $admin = User::where('email', 'admin@example.com')->first();

        if (!$admin) {
            abort(Response::HTTP_FORBIDDEN, 'Admin non trovato');
        }

        // Simula il login
        Auth::login($admin);
    }

    /**
     * Login
     *
     * Gestisce il tentativo di login.
     */
    public function login(LoginRequest $request): User
    {
        if (!Auth::check()) {
            $credentials = $request->only('email', 'password');
            $remember = $request->boolean('remember', false);

            if (Auth::attempt($credentials, $remember)) {
                // Rigenera la sessione per prevenire session fixation
                $request->session()->regenerate();
            } else {
                // Se le credenziali non sono valide, solleviamo eccezione di validazione
                throw ValidationException::withMessages(
                    [
                        // Se mail non trovata ha già un messaggio dedicato, quindi mettiamo sulla password
                        'password' => 'Le credenziali non sono corrette.',
                    ]
                );
            }
        }

        // Redirect alla pagina che l’utente voleva visitare
        return Auth::user();
    }

    /**
     * Get
     *
     * Restituisce l'utente loggato
     */
    public function get(): ?User
    {
        return Auth::user();
    }

    /**
     * Logout
     */
    public function logout(): void
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
}

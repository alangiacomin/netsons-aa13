<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

/**
 * @group User
 */
class UserController extends Controller
{
    /**
     * List
     *
     * Display a listing of the resource.
     *
     * @apiResourceCollection  App\Http\Resources\UserResource
     *
     * @apiResourceModel App\Models\User
     */
    public function index(): JsonResource
    {
        return UserResource::collection(User::all());
    }

    /**
     * Store
     *
     * Store a newly created resource in storage.
     *
     * @apiResource App\Http\Resources\UserResource
     *
     * @apiResourceModel App\Models\User
     */
    public function store(StoreUserRequest $request): JsonResource
    {
        $user = User::create([
            ...$request->validated(),
            'password' => bcrypt('password123'),
        ]);

        return new UserResource($user);
    }

    /**
     * Show
     *
     * Display the specified resource.
     *
     * @param  User  $user  ID dello user
     *
     * @apiResource      App\Http\Resources\UserResource
     *
     * @apiResourceModel App\Models\User
     */
    public function show(User $user): JsonResource
    {
        return new UserResource($user);
    }

    /**
     * Update
     *
     * Update the specified resource in storage.
     *
     * @apiResource      App\Http\Resources\UserResource
     *
     * @apiResourceModel App\Models\User
     */
    public function update(Request $request, User $user)
    {
        //
        // return response()->json($fumetto, Response::HTTP_OK);
        // CreaFumettoRandom::execute($fumetto);

        return new UserResource($user);
    }

    /**
     * Destroy
     *
     * Remove the specified resource from storage.
     *
     * @response 204
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Login fake
     *
     * Gestisce il tentativo di login.
     *
     * @apiResource      App\Http\Resources\UserResource
     *
     * @apiResourceModel App\Models\User
     */
    public function loginFake()
    {
        // Trova l'utente admin (email hardcoded come esempio)
        $admin = User::where('email', 'admin@example.com')->first();

        if (!$admin) {
            abort(Response::HTTP_FORBIDDEN, 'Admin non trovato');
        }

        // Simula il login
        Auth::login($admin);

        return new UserResource($admin);
    }

    /**
     * Login
     *
     * Gestisce il tentativo di login.
     *
     * @apiResource      App\Http\Resources\UserResource
     *
     * @apiResourceModel App\Models\User
     */
    public function login(LoginRequest $request): JsonResource
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
        return new UserResource(Auth::user());
    }

    /**
     * Authenticated
     *
     * Restituisce l'utente loggato
     *
     * @apiResource      App\Http\Resources\UserResource
     *
     * @apiResourceModel App\Models\User
     */
    public function authenticated(): JsonResource
    {
        return new UserResource(Auth::user());
    }

    /**
     * Logout
     *
     * @response 204
     */
    public function logout()
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}

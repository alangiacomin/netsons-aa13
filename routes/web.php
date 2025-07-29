<?php

use App\Http\Controllers\Fumetto\FumettoBisController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::apiResource('fumetti', FumettoBisController::class)->parameters(
        [
            'fumetti' => 'fumetto',
        ]
    );

    Route::prefix('user')->name('user.')->group(function () {
        Route::get('authenticated', [UserController::class, 'authenticated'])->name('authenticated');
        Route::post('login', [UserController::class, 'login'])->name('login'); // ->middleware('guest');
        Route::post('loginFake', [UserController::class, 'loginFake'])->name('login')->middleware('guest');
        Route::post('logout', [UserController::class, 'logout'])->name('logout')->middleware('auth');
        Route::get('permissions/{section}', function (string $section) {
            $user = auth()->user();

            return $user?->getAllPermissions()
                ->filter(fn ($perm) => str_starts_with($perm->name, $section.'-'))
                ->pluck('name')
                ->toArray();
        })->name('permissions');
    });
    Route::apiResource('user', UserController::class);
});

Route::fallback(function () {
    return view('home');
});

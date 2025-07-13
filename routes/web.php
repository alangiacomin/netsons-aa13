<?php

use App\Http\Controllers\Fumetto\FumettoBisController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::apiResource('fumetti', FumettoBisController::class)->parameters(
        [
            'fumetti' => 'fumetto',
        ]
    );

    Route::prefix('user')->name('user.')->group(function () {
        Route::post('login', [UserController::class, 'login'])->name('login')->middleware('guest');
        Route::post('logout', [UserController::class, 'logout'])->name('logout')->middleware('auth');
    });
});

Route::fallback(function () {
    return view('home');
});

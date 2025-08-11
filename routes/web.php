<?php

use App\Http\Controllers\FumettoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::prefix('fumetti')->name('fumetti.')->group(function () {
        Route::get('getListMancanti', [FumettoController::class, 'getListMancanti'])->name('getListMancanti');
    });
    Route::apiResource('fumetti', FumettoController::class)->parameters(
        [
            'fumetti' => 'fumetto',
        ]
    );

    Route::prefix('user')->name('user.')->group(function () {
        Route::get('authenticated', [UserController::class, 'authenticated'])->name('authenticated');
        Route::post('login', [UserController::class, 'login'])->name('login'); // ->middleware('guest');
        Route::post('loginFake', [UserController::class, 'loginFake'])->name('login')->middleware('guest');
        Route::post('logout', [UserController::class, 'logout'])->name('logout')->middleware('auth');
    });
    Route::apiResource('user', UserController::class);
});

Route::fallback(function () {
    return view('home');
});

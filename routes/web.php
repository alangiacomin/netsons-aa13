<?php

use App\Http\Controllers\Fumetto\FumettoBisController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('fumetti', FumettoBisController::class)->parameters([
    'fumetti' => 'fumetto',
]);

Route::prefix('user')->name('user.')->group(function () {
    Route::post('login', [UserController::class, 'login'])->name('login')->middleware('guest');
    Route::post('logout', [UserController::class, 'logout'])->name('logout')->middleware('auth');
});

Route::fallback(function (Request $request) {
    // \Log::info('Utente attuale:', ['user' => auth()->user()]);
    // \Log::info('Request:', ['request' => $request]);

    return view('home');
});

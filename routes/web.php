<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('fumetti', \App\Http\Controllers\Fumetto\FumettoBisController::class)->parameters([
    'fumetti' => 'fumetto'
]);;



Route::fallback(function (Request $request) {
    // \Log::info('Utente attuale:', ['user' => auth()->user()]);
    // \Log::info('Request:', ['request' => $request]);

    return view('home');
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::post('/login', [AuthenticatedSessionController::class, 'store_api']);

Route::get('/test', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
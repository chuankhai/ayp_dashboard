<?php

use App\Http\Controllers\ClaimController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/claims', [ClaimController::class, 'index']);

Route::post('/claims', [ClaimController::class, 'store']);
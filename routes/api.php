<?php

use App\Http\Controllers\BoardListsController;
use App\Http\Controllers\BoardsController;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('boards', function () {
    return DB::table('boards')->where('author_id', '=', 1)->get();
});

Route::get('boards/{id}', function (string $id) {
    return DB::table('boards')->where('id', '=', intval($id))->get();
})->where('id', '[0-9]+');



Route::group(['middleware' => ['web']], function () {
    Route::post('auth/login', [LoginController::class, 'login']);
    Route::get('auth/check', [LoginController::class, 'check']);
    Route::get('auth/logout', [LoginController::class, 'logout']);

    Route::get('boards/all', [BoardsController::class, 'all']);
    Route::get('boards/{id}', [BoardsController::class, 'one']);
    Route::get('boards/user/{id}', [BoardsController::class, 'byUser']);

    Route::post('boards/{id}/lists', [BoardListsController::class, 'store']);
    Route::delete('boards/{id}/lists', [BoardListsController::class, 'delete']);
    Route::put('boards/{id}/lists', [BoardListsController::class, 'update']);
   
});









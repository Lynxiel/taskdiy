<?php

use Illuminate\Support\Facades\Route;


Route::any('{all}', function () {
    return view('index');
})
->where(['all' => '.*']);




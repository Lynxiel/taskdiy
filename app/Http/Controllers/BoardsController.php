<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardsController extends Controller
{
    protected function guard($guard = 'web')
    {
        return Auth::guard($guard);
    }


    public function all(){
        return  response()->json(Board::all()); 
    }

    public function one(int $id){
        return response()->json( Board::where('id',$id)->with('lists')->firstOrFail()); 
    }
    public function byUser(int $user_id){
        return response()->json( Board::where('author_id', $user_id)->get());
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\BoardList;
use Illuminate\Http\Request;

class BoardListsController extends Controller
{
    //
    public function store(int $board_id , Request $request){

        $list = new BoardList([
            'board_id'=>$board_id,
            'name'=>$request->input('name'),
            'description'=>$request->input('description'),
        ]
        );
        $list->save();
    }

    public function update(){
        
    }

    public function all (int $board_id){
        return response()->json( BoardList::where('id',$board_id)->get()); 
 
    }
}

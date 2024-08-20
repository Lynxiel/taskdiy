<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Task  extends Model
{
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'board_id',
        'list_id',
        'executor_id',
        'author_id'
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id','author_id');
    }

    public function executor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id','executor_id');
    }

    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class, 'id','board_id');
    }

   
}

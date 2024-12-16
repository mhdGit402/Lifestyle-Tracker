<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'lifestyle_id'
    ];

    public function lifestyle()
    {
        return $this->belongsTo(lifestyle::class);
    }
}

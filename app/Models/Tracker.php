<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    use HasFactory;

    protected $fillable = [
        'submitted_date',
        'items',
        'lifestyle_id',
    ];

    public function lifestyle()
    {
        return $this->belongsTo(Lifestyle::class);
    }
}

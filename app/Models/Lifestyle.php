<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lifestyle extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'user_id',
        'items'
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function trackers()
    {
        return $this->hasMany(Tracker::class);
    }
}

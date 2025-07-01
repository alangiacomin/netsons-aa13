<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fumetto extends Model
{
    /** @use HasFactory<\Database\Factories\FumettoFactory> */
    use HasFactory;

    protected $fillable = [
        'Titolo',
        'Numero',
        'DataPubblicazione',
    ];
}

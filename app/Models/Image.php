<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Image extends Model
{
    use HasFactory;
    protected $primaryKey = 'url';
    public $incrementing = false;
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_images');
    }
}

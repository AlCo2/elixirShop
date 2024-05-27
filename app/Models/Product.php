<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory;
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function promotion(): HasOne
    {
        return $this->HasOne(Promotion::class);
    }

    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class, 'product_images');
    }
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favourites');
    }
}

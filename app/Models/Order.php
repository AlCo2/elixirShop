<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;
    
    public function order_detail(): HasOne
    {
        return $this->hasOne(Order_detail::class);
    }
    public function order_item(): HasMany
    {
        return $this->hasMany(Order_item::class);
    }
}

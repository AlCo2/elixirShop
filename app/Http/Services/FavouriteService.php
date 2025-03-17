<?php

namespace App\Http\Services;

class FavouriteService
{
    public function addProductToFavourite($user, $product) {
        $user->products()->toggle([$product->id]);
    }

    public function getFavouriteProducts($user) {
        return $user->products;
    }
}

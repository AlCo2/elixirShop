<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\User;

class OrderController extends Controller
{
    public function addToCart(Request $request){
        $product_id = $request->input('product_id');
        if (!$request->session()->has('cart')){
            $request->session()->put('cart', []);
        }
        $cart = $request->session()->get('cart');
        if (isset($cart[$product_id]))
        {
            $cart[$product_id] += 1;
        }
        else
        {
            $cart[$product_id] = 1;
        }
        $request->session()->put('cart', $cart);
        return $request->session()->all();
    }
}

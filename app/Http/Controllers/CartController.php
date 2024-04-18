<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class CartController extends Controller
{
    public function addToCart(Request $request){
        $product_id = $request->input('product_id');
        if (!$request->session()->has('cart')){
            $request->session()->put('cart', []);
        }
        $cart = $request->session()->get('cart');
        if (isset($cart[$product_id]))
        {
            $cart[$product_id]['Q'] += 1;
        }
        else
        {
            $product = Product::find($product_id);
            $cart[$product_id] = [
                'product' => $product,
                'Q' => 1
            ];
        }
        $request->session()->put('cart', $cart);
    }
    public function subFromCart(Request $request)
    {
        $product_id = $request->input('product_id');
        $cart = $request->session()->get('cart');
        if ($cart[$product_id]['Q'] > 1)
            $cart[$product_id]['Q'] -= 1;
        $request->session()->put('cart', $cart);
    }
    public function deleteFromCart(Request $request)
    {
        $product_id = $request->input('product_id');
        $cart = $request->session()->get('cart');
        unset($cart[$product_id]);
        $request->session()->put('cart', $cart);
    }
}

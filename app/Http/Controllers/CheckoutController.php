<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\models\Product;
class CheckoutController extends Controller
{
    public function index(Request $request){
        $data = [];
        if (!$request->session()->has('cart')){
            return Inertia::render('checkout/page', compact('data'));
        }
        $products = $request->session()->get('cart');
        $total = 0;
        foreach ($products as $product)
        {
            $data[] = [
                'product' => $product['product'],
                'Q' => $product['Q'],
            ];
            $total += $product['product']->price * $product['Q'];
        }
        $request->session()->put('total', $total);
        return Inertia::render('checkout/page', compact('data'));
    }
    public function checkout(Request $request){
        if (!$request->session()->has('cart')){
            return Inertia::render('/');
        }
        $order = [
            'detail'=> $request->session()->get('cart'),
            'total'=> $request->session()->get('total'),
        ];
        return Inertia::render('checkout/fastcheckout/page', compact('order'));
    }
}

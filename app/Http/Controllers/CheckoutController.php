<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\models\Product;
class CheckoutController extends Controller
{
    public function index(Request $request){
        $products = $request->session()->get('cart');
        $data = [];
        foreach ($products as $product)
        {
            $data[] = [
                'product' => $product['product'],
                'Q' => $product['Q'],
            ];
        }
        return Inertia::render('checkout/page', compact('data'));
    }
    public function checkout(){
        return Inertia::render('checkout/fastcheckout/page');
    }
}

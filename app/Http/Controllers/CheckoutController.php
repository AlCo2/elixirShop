<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\models\Product;
class CheckoutController extends Controller
{
    public function getCurrentCartData(Request $request)
    {
        $data = $this->prepareData();
        return $data;
    }
    public function index(Request $request){
        $data = $this->prepareData();
        return Inertia::render('checkout/page', compact('data'));
    }

    public function checkout(Request $request){
        if (!$this->haveAccessFastCheckout()){
            return back();
        }
        $order = $this->prepareOrder();
        return Inertia::render('checkout/fastcheckout/page', compact('order'));
    }
    
    private function isCartExist(): bool
    {
        return session()->has('cart');
    }

    private function prepareData(): array
    {
        $data = [];
        if (!$this->isCartExist()){
            return $data;
        }
        $products = session('cart');
        $total = 0;
        foreach ($products as $product)
        {
            $data[] = [
                'product' => $product['product'],
                'Q' => $product['Q'],
            ];
            if ($product['product']->promotion && $product['product']->promotion['active'])
                $total += $product['product']->promotion['promotion_price'] * $product['Q'];
            else
                $total += $product['product']->price * $product['Q'];
        }
        $this->createTotal($total);
        return $data;
    }
    
    private function createTotal($total): void
    {
        session(['total'=>$total]);
    }

    private function haveAccessFastCheckout():bool
    {
        $total = session('total');
        return $this->isCartExist() && $total > 0;
    }

    private function prepareOrder():array
    {
        $order = [
            'detail'=> session('cart'),
            'total'=> session('total'),
        ];
        return $order;
    }
}

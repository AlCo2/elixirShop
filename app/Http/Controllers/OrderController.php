<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Order_item;

class OrderController extends Controller
{
    public function createOrder(Request $request){
        $order = new Order();
        if ($request->input('user_id'));
            $order->user_id = $request->input('user_id');
        $order->total = $request->input('order')['total'];
        // save order before continue
        $order->save();
        $order_detail = new Order_detail();
        $order_detail->order_id = $order->id;
        $order_detail->firstname = $request->input('firstname');
        $order_detail->lastname = $request->input('lastname');
        $order_detail->country = $request->input('country');
        $order_detail->city = $request->input('city');
        $order_detail->address = $request->input('address');
        $order_detail->zip = $request->input('zip');
        $order_detail->phone = $request->input('phone');
        // save order_detail before contrinue
        $order_detail->save();
        foreach ($request->input('order')['detail'] as $product){
            $order_product = new Order_item();
            $order_product->order_id = $order->id;
            $order_product->product_id = $product['product']['id'];
            $order_product->Qty = $product['Q'];
            $order_product->total = $product['product']['price'] * $product['Q'];
            $order_product->save();
        }
        $request->session()->forget(['cart', 'total']);
        return redirect('/')->with('success', 'your order has created succesfuly');
    }
}

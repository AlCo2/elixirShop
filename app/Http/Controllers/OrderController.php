<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Order_item;
use App\Models\Product;

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
    public function updateOrderStatus($id, Request $request){
        $order = Order::find($id);
        $order->status_id = $request->input('status');
        $order->save();
    }

    public function checkOrder(){
        return Inertia::render('checkorder/page');
    }
    public function showOrder(Request $request){
        $id = $request->input('order_id');
        $order = Order::with('order_detail', 'Order_item')->find($id);
        $products = [];
        if (!$order)
            return Inertia::render('checkorder/showorder/page', compact('order', 'products'));
        foreach($order->order_item as $item)
        {
            $product = Product::with('images')->find($item['product_id']);
            $products[] = [
                'product'=> $product,
                'total' => $item['total'],
            ];
        }
        return Inertia::render('checkorder/showorder/page', compact('order', 'products'));
    }
}

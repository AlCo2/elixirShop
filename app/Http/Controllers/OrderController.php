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
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'country' => 'required',
            'city' => 'required',
            'address' => 'required',
            'zip' => 'required',
            'phone' => 'required',
        ]);
        $order_id = $this->saveOrder($request);
        $this->saveOrderDetail($order_id, $request);
        $this->saveOrderItem($order_id, $request->order['detail']);
        $this->deleteCart();
        return redirect('/')->with('success', 'your order has created succesfuly');
    }
    public function updateOrderStatus($id, Request $request){
        $order = Order::find($id);
        $order->status_id = $request->status;
        $order->save();
    }

    public function checkOrder(){
        return Inertia::render('checkorder/page');
    }

    public function showOrder(Request $request){
        $id = $request->order_id;
        $order = Order::with('order_detail', 'Order_item')->find($id);
        $products = [];
        if (!$order)
            return Inertia::render('checkorder/showorder/page', compact('order', 'products'));
        $products = $this->prepereProducts($order->order_item);
        return Inertia::render('checkorder/showorder/page', compact('order', 'products'));
    }

    private function prepereProducts($items): array
    {
        $products = [];
        foreach($items as $item)
        {
            $product = Product::with('images')->find($item['product_id']);
            $products[] = [
                'product'=> $product,
                'total' => $item['total'],
            ];
        }
        return $products;
    }

    private function saveOrder($request)
    {
        $order = new Order();
        if ($request->user_id);
            $order->user_id = $request->user_id;
        $order->total = $request->order['total'];
        $order->save();
        return $order->id;
    }

    private function saveOrderDetail($order_id, $request): void
    {
        $order_detail = new Order_detail();
        $order_detail->order_id = $order_id;
        $order_detail->firstname = $request->firstname;
        $order_detail->lastname = $request->lastname;
        $order_detail->country = $request->country;
        $order_detail->city = $request->city;
        $order_detail->address = $request->address;
        $order_detail->zip = $request->zip;
        $order_detail->phone = $request->phone;
        $order_detail->save();        
    }
    
    private function saveOrderItem($order_id, $products)
    {
        foreach ($products as $product)
        {
            $order_product = new Order_item();
            $order_product->order_id = $order_id;
            $order_product->product_id = $product['product']['id'];
            $order_product->Qty = $product['Q'];
            $order_product->total = $product['product']['price'] * $product['Q'];
            $order_product->save();
        }
    }
    private function deleteCart()
    {
        session()->forget(['cart', 'total']);
    }
}

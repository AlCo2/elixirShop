<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\User;
use App\Models\Message;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Order_item;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function overview(){
        // get 5 products from the db
        $products = Product::limit(5)->with('category')->get();
        // get total number of products
        $total_products = Product::count();
        // prepere arrays where to save orders and products tracks
        $products_overview = [];
        $orders_overview = [];
        $products_overview_objects = DB::table('products_overview')->orderBy('date_created', 'asc')->get('total_products');
        $orders_overview_objects = DB::table('orders_overview')->orderBy('date_created', 'asc')->get('total_orders');
        foreach ($orders_overview_objects as $data)
        {
            $orders_overview[] = $data->total_orders;
        }
        foreach ($products_overview_objects as $data)
        {
            $products_overview[] = $data->total_products;
        }
        // total price of all completed orders
        $total_sales = 0;
        $order_item = Order_item::with('order')->get();
        $total_orders = Order::count();
        foreach ($order_item as $order)
        {
            // if order is completed, add its price to the total
            if ($order->order->status_id === 2)
                $total_sales += $order->total;
        }
        return Inertia::render('dashboard/page', compact('products', 'total_sales', 'total_products', 'total_orders', 'products_overview', 'orders_overview'));
    }

    public function customer(){
        $customers = User::all();
        return Inertia::render('dashboard/customer/page', compact('customers'));
    }

    public function category(){
        $categories = Category::all();
        return Inertia::render('dashboard/category/page', compact('categories'));
    }

    public function product(){
        $products = Product::with('category', 'images')->get();
        $categories = Category::all();
        return Inertia::render('dashboard/product/page', compact('products', 'categories'));
    }
    
    public function productTrack()
    {
        $products_overview = DB::table('products_overview')->get();
        $total_products = Product::count();
        return Inertia::render('dashboard/product/track', compact('products_overview', 'total_products'));
    }

    public function order(){
        $order = Order::with('order_detail')->get();
        return Inertia::render('dashboard/order/page', compact('order'));
    }

    public function track()
    {
        $orders_overview = DB::table('orders_overview')->get();
        $sales_overview = DB::table('sales_overview')->get();
        $total_orders = Order::count();
        return Inertia::render('dashboard/order/track', compact('orders_overview', 'sales_overview', 'total_orders'));
    }

    public function promotion(){
        $products = Product::whereDoesntHave('promotion')->get();
        $promotions = Promotion::with('product')->get();
        return Inertia::render('dashboard/promotion/page', compact('products', 'promotions'));
    }

    public function message(){
        $messages = Message::get();
        return Inertia::render('dashboard/message/page', compact('messages'));
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use App\Models\Order_detail;

class DashboardController extends Controller
{
    public function overview(){
        $products = Product::limit(5)->with('category')->get();
        return Inertia::render('dashboard/page', compact('products'));
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
        $products = Product::with('category')->get();
        $categories = Category::all();
        return Inertia::render('dashboard/product/page', compact('products', 'categories'));
    }
    public function order(){
        $order = Order::with('order_detail')->get();
        return Inertia::render('dashboard/order/page', compact('order'));
    }
}

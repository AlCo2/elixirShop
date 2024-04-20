<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;

class DashboardController extends Controller
{
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
        $order = Order::all(); 
        return Inertia::render('dashboard/order/page', compact('order'));
    }
}

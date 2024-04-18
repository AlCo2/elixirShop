<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class StoreController extends Controller
{

    public function index(){
        $products = Product::all();
        return Inertia::render('store/page', compact('products'));
    }

    public function product($id){
        $product = Product::with('category')->find($id);
        $products = Product::limit(5)->get();
        return Inertia::render('store/product/page', compact('product', 'products'));
    }
}

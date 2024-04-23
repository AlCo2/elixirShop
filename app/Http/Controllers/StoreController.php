<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
/* temp */
use Illuminate\Support\Facades\Http;

class StoreController extends Controller
{
    public function home(){
        $featured = Product::inRandomOrder()->limit(4)->with('images')->get();
        $bestsellers = Product::inRandomOrder()->limit(4)->with('images')->get();
        $latest = Product::inRandomOrder()->limit(4)->with('images')->get();
        return Inertia::render('page', compact('featured', 'bestsellers', 'latest'));
    }
    public function index(){
        $products = Product::with('images')->get();
        return Inertia::render('store/page', compact('products'));
    }

    public function product($id){
        $product = Product::with('category', 'images')->find($id);
        $products = Product::inRandomOrder()->limit(5)->with('images')->get();
        return Inertia::render('store/product/page', compact('product', 'products'));
    }
}

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
    /* temp */
    public function test(){
        $response = Http::get('https://api.escuelajs.co/api/v1/products');
        $jsonData = $response->json();
        $categories = [];
        foreach ($jsonData as $product){
            if (!in_array(['name'=>$product['category']], $categories))
                $categories[] = ['name'=>$product['category']];
        }
        return $categories;
    }
    /* end */

    public function home(){
        $featured = Product::inRandomOrder()->limit(4)->get();
        $bestsellers = Product::inRandomOrder()->limit(4)->get();
        $latest = Product::inRandomOrder()->limit(4)->get();
        return Inertia::render('page', compact('featured', 'bestsellers', 'latest'));
    }
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

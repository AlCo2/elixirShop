<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
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
    public function index(Request $request){
        $category_list = Category::all();
        $filter = [];
        $sort = null;
        if($request->has('sort'))
        {
            $word = "";
            $sort = $request->sort;
            if ($sort == 3)
            {
                if($request->has('filter')){
                    $filter = $request->input('filter');
                    $products = Product::with('images')->whereIn('category_id', $filter)->orderByDesc('created_at')->paginate(12);
                }else{
                    $products = Product::with('images')->orderByDesc('created_at')->paginate(12);
                }
            }
            else{
                switch($sort){
                    case 1:
                        $word = "asc";
                        break;
                    case 2:
                        $word = "desc";
                        break;
                }
                if($request->has('filter')){
                    $filter = $request->input('filter');
                    $products = Product::with('images')->whereIn('category_id', $filter)->orderBy('price', $word)->paginate(12);
                }else{
                    $products = Product::with('images')->orderBy('price', $word)->paginate(12);
                }
            }
        }
        else
        {
            if($request->has('filter')){
                $filter = $request->input('filter');
                $products = Product::with('images')->whereIn('category_id', $filter)->inRandomOrder()->paginate(12);
            }else{
                $products = Product::with('images')->inRandomOrder()->paginate(12);
            }
        }
        return Inertia::render('store/page', compact('products', 'category_list', 'filter', 'sort'));
    }

    public function product($id){
        $product = Product::with('category', 'images')->find($id);
        $products = Product::inRandomOrder()->limit(5)->with('images')->get();
        return Inertia::render('store/product/page', compact('product', 'products'));
    }
}

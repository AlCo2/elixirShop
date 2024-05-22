<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
/* temp */
use Illuminate\Support\Facades\Http;

class StoreController extends Controller
{
    public function home(){
        $promotions = Promotion::inRandomOrder()->limit(4)->with('product', 'product.images')->where('active', true)->get();
        $featured = Product::inRandomOrder()->limit(4)->with('images')->get();
        $bestsellers = Product::inRandomOrder()->limit(4)->with('images')->get();
        $latest = Product::inRandomOrder()->limit(4)->with('images')->get();
        return Inertia::render('page', compact('featured', 'bestsellers', 'latest', 'promotions'));
    }

    public function promotion_api()
    {
        $promotions = Product::whereHas('promotion')->inRandomOrder()->limit(4)->with('images', 'category', 'promotion')->get();
        return $promotions;
    }
    
    public function popular_api()
    {
        $popular = Product::whereDoesntHave('promotion')->inRandomOrder()->limit(4)->with('images', 'category')->get();
        return $popular;
    }

    public function index(Request $request){
        $category_list = Category::all();
        $filter = [];
        $sort = null;
        $max_price = Promotion::max('promotion_price');
        $maxPrice = $max_price;
        $min_price = Promotion::min('promotion_price');
        $active = False;
        if($request->min && $request->max)
        {
            $min_price = $request->min;
            $max_price = $request->max;
            $active = True;
        }
        $filteredprice = [
            'min'=>$min_price, 
            'max'=>$max_price,
            'active'=>$active,
        ];

        $query = Product::with('images', 'promotion')
        ->join('promotions', 'promotions.product_id', '=', 'products.id')
        ->whereBetween('promotions.promotion_price', [$min_price, $max_price]);

        if ($request->has('filter'))
        {
            $filter = $request->input('filter');
            $query->whereIn('category_id', $filter);
        }

        if($request->has('sort'))
        {
            $sort = $request->input('sort');
            switch ($sort) {
                case 1:
                    $query->orderBy('promotions.promotion_price', 'asc');
                    break;
                case 2:
                    $query->orderBy('promotions.promotion_price', 'desc');
                    break;
                case 3:
                    $query->orderBy('products.created_at', 'desc');
                    break;
            }
        }
        $products = $query->paginate(20);
        return Inertia::render('store/page', compact('products', 'category_list', 'filter', 'sort', 'filteredprice', 'maxPrice'));
    }

    public function product(Request $request, $id){
        $product = Product::with('category', 'images', 'promotion')->find($id);
        if (!$product)
        {
            return abort(404);
        }
        $products = Product::inRandomOrder()->limit(5)->with('images')->get();
        $categories = [];
        if($request->user() && $request->user()->role_id == 1)
            $categories = Category::all();
        return Inertia::render('store/product/page', compact('product', 'products', 'categories'));
    }
}

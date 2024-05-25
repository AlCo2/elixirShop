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
        $promotions = Product::inRandomOrder()->limit(12)->with('promotion', 'images')->get();
        $featured = Product::inRandomOrder()->limit(4)->with('images', 'promotion')->get();
        $bestsellers = Product::inRandomOrder()->limit(4)->with('images', 'promotion')->get();
        $latest = Product::inRandomOrder()->limit(4)->with('images', 'promotion')->get();
        return Inertia::render('page', compact('featured', 'bestsellers', 'latest', 'promotions'));
    }

    public function manPage(Request $request)
    {
        $type = 'man';
        $maxPrice = Promotion::max('promotion_price');
        $category_list = Category::all();
        $query = $this->createQuery($request, $type);
        $products = $query->paginate(20);
        return Inertia::render('store/page', compact('products', 'category_list', 'maxPrice', 'type'));
    }

    public function womanPage(Request $request)
    {
        $type = 'woman';
        $category_list = Category::all();
        $maxPrice = Promotion::max('promotion_price');
        $query = $this->createQuery($request, $type);
        $products = $query->paginate(20);
        return Inertia::render('store/page', compact('products', 'category_list', 'maxPrice','type'));
    }

    public function index(Request $request){
        $category_list = Category::all();
        $maxPrice = Promotion::max('promotion_price');
        $query = $this->createQuery($request, null);
        $products = $query->paginate(20);
        return Inertia::render('store/page', compact('products', 'maxPrice', 'category_list'));
    }

    private function createQuery($request, $type)
    {
        $query = Product::with('images', 'promotion')
        ->join('promotions', 'promotions.product_id', '=', 'products.id');

        if (isset($type))
        {
            if ($type =='woman')
                $query->where('category_id', 1);
            else
                $query->where('category_id', 2);
        }
        if($request->min && $request->max)
        {
            $query->whereBetween('promotions.promotion_price', [$request->min, $request->max]);
        }

        if ($request->has('title'))
        {
            $title = $request->input('title');
            $query->where('title', 'like', $title.'%');
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
        return $query;
    }
    public function product(Request $request, $id){
        $product = Product::with('category', 'images', 'promotion')->find($id);
        if (!$product)
        {
            return abort(404);
        }
        $products = Product::inRandomOrder()->limit(5)->with('images', 'promotion')->get();
        $categories = [];
        if($request->user() && $request->user()->role_id == 1)
            $categories = Category::all();
        return Inertia::render('store/product/page', compact('product', 'products', 'categories'));
    }
}

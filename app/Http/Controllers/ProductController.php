<?php

namespace App\Http\Controllers;

use App\Http\Services\FavouriteService;
use App\Http\Services\ImageService;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    protected ImageService $imageService;
    protected FavouriteService $favouriteService;

    public function __construct(ImageService $imageService, FavouriteService $favouriteService)
    {
        $this->imageService = $imageService;
        $this->favouriteService = $favouriteService;
    }

    // get all products in a random order
    public function index(){
        return Product::with('images', 'category', 'promotion')
            ->inRandomOrder()
            ->get();
    }

    public function show($id){
        $product = Product::with('category', 'images', 'promotion')->findOrFail($id);
        if (Auth::check()){
            $favourites = Auth::user()->products;
        }
        $products = Product::inRandomOrder()->limit(5)->with('images', 'promotion')->get();
        $categories = Category::all();
        return Inertia::render('product/page', compact('product', 'products', 'categories', 'favourites'));
    }

    // add new Product
    public function store(Request $request){
        $request->validate([
            'title' => ['required', 'max:50'],
            'Qty' => ['required'],
            'price' => ['required'],
        ]);
        $product = Product::create($request->all());

        for ($i=1;$i<=3;$i++) {
            $name = $i===1?"image":"image".$i;
            if($request->hasFile($name)){
                $this->imageService->addProductImage($product, $request->file($name));
            }
        }

        return back()->with(['success' => 'Product added successfully.']);
    }

    public function update($id, Request $request){
        $request->validate([
            'title' => ['required'],
            'Qty' => ['required'],
            'price' => ['required'],
            'description' => ['nullable'],
        ]);
        $product = Product::with('images', 'promotion')->findOrFail($id);

        if ($product->promotion && $product->promotion->promotion_price >= $request->price) {
            return back()->with(['error'=>"product price must be bigger then promotion price"]);
        }
        $product->update($request->all());
        for ($i=1;$i<=3;$i++) {
            $name = $i===1?"image":"image".$i;
            if($request->hasFile($name)){
                $req_image = $request->file($name);
                $this->imageService->updateProductImage($i-1, $product, $req_image);
            }
        }
        return back()->with(['success'=>"product updated successfully"]);
    }

    public function destroy($id)
    {
        $product = Product::with('images')->findOrFail($id);
        $this->imageService->deleteListOfImages($product->images);
        $product->delete();
    }


    public function addProductToFavourit(Request $request)
    {
        $this->favouriteService->addProductToFavourite($request->user(), Product::findOrFail($request->get('product_id')));
        return response()->json([], 201);
    }

    // get user favourite products
    public function getFavouriteProducts(Request $request)
    {
        return $this->favouriteService->getFavouriteProducts($request->user()->load('products.images', 'products.promotion'));
    }
}

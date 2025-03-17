<?php

namespace App\Http\Controllers;

use App\Http\Services\FavouriteService;
use App\Http\Services\ImageService;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

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
        return Product::findOrFail($id);
    }

    // add or delete product from favourite
    public function addProductToFavourit(Request $request)
    {
        $this->favouriteService->addProductToFavourite($request->user(), Product::findOrFail($request->get('product_id')));
        return Json()->response(201);
    }

    // get user favourite products
    public function getFavouriteProducts(Request $request)
    {
        return $this->favouriteService->getFavouriteProducts($request->user()->load('products.images', 'products.promotion'));
    }

    // add new Product
    public function store(Request $request){
        $request->validate([
            'title' => ['required', 'max:50'],
            'Qty' => ['required'],
            'price' => ['required'],
        ]);
        $product = Product::create($request->all());

        if($request->hasFile('image')){
            $this->imageService->addProductImage($product, $request->file('image'));
        }
        if($request->hasFile('image2')){
            $this->imageService->addProductImage($product, $request->file('image2'));
        }
        if($request->hasFile('image3')){
            $this->imageService->addProductImage($product, $request->file('image3'));
        }
         return response('Product added successfully', 200);
    }

    public function update($id, Request $request){
        $request->validate([
            'title' => ['required', 'max:50'],
            'Qty' => ['required'],
            'price' => ['required'],
            'description' => ['nullable'],
        ]);
        $product = Product::with('images', 'promotion')->find($id);
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

}

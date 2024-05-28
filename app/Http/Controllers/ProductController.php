<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{

    public function all(){
        $products = Product::with('images', 'category', 'promotion')->inRandomOrder()->get();
        return $products;
    }
    
    public function cart_products(Request $request)
    {
        $products = [];
        $total = 0;
        foreach ($request->data as $key => $value)
        {
            $product = Product::with('images', 'category', 'promotion')->find($key);
            $products[] = $product;
            if ($product->promotion)
                $total += $product->promotion['promotion_price'] * $value;
            else
                $total += $product->price * $value;
        }
        $data = [
            'total' => $total,
            'products' => $products,
        ];
        return $data;
    }
    
    public function get($id){
        $product = Product::find($id);
        if ($product)
        {
            return $product;
        }
        return "not found";
    }

    private function addProductImage($product, $image)
    {
        $imageName = time().$image->getClientOriginalName();
        $image->move(public_path('images'), $imageName);
        $name = "/images/" . $imageName;
        DB::table('images')->updateOrInsert(['url'=>$name]);
        $product->images()->attach($name);
    }

    public function favourite(Request $request)
    {
        $user = $request->user();
        $product_id = $request->product_id;
        $user->products()->toggle([$product_id]);
    }
    
    public function getFavouritesProducts(Request $request)
    {
        $user = $request->user();
        $user->load('products.images', 'products.promotion');
        $products = $user->products;
        return $products;
    }

    public function add(Request $request){
        $request->validate([
            'title' => ['required', 'max:50'],
            'Q' => ['required'],
            'price' => ['required'],
        ]);
        $product = new Product();
        $product->title  = $request->title;
        $product->description = $request->description;
        $product->category_id = $request->category;
        $product->Qty  = $request->Q;
        $product->price  = $request->price;
        $product->save();
        if($request->hasFile('image')){
            $image = $request->file('image');
            $this->addProductImage($product, $image);
        }
        if($request->hasFile('image2')){
            $image = $request->file('image2');
            $this->addProductImage($product, $image);
        }
        if($request->hasFile('image3')){
            $image = $request->file('image3');
            $this->addProductImage($product, $image);
        }
    }

    public function update($id, Request $request){
        $product = Product::with('images')->find($id);
        $product->title = $request->title;
        $product->category_id = $request->category;
        $product->description = $request->description;
        $product->Qty = $request->Q;
        $product->price = $request->price;
        if($request->hasFile('image')){
            $req_image = $request->file('image');
            $this->updateProductImage(0, $product, $req_image);
        }
        if($request->hasFile('image2')){
            $req_image = $request->file('image2');
            $this->updateProductImage(1, $product, $req_image);
        }
        if($request->hasFile('image3')){
            $req_image = $request->file('image3');
            $this->updateProductImage(2, $product, $req_image);
        }
        $product->save();
    }

    private function updateProductImage($id, $product, $req_image)
    {
        $imageName = time().$id.$req_image->getClientOriginalName();
        $req_image->move(public_path('images'), $imageName);
        $name = "/images/" . $imageName;
        if (isset($product->images[$id]))
        {
            $url = $product->images[$id]->url;
            File::delete(public_path($url));
            $image = Image::find($url);
            $image->url = $name;
            $product->images()->detach($url);
            $image->save();
        }
        else
        {
            DB::table('images')->updateOrInsert(['url'=>$name]);
        }
        $product->images()->attach($name);
    }

    public function delete($id)
    {
        $product = Product::with('images')->find($id);
        foreach($product->images as $product_image)
        {
            $url = $product_image->url;
            $image = Image::find($url);
            File::delete(public_path($url));
            $image->delete();
        }
        $product->delete();
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

}

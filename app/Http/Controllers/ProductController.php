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
    // get all products in a random order
    public function all(){
        $products = Product::with('images', 'category', 'promotion')->inRandomOrder()->get();
        return $products;
    }
    
    // get the products from the cart
    public function cart_products(Request $request)
    {
        $products = [];
        $total = 0;
        // get each product from the cart, and calculate the total
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

    // get each product using id
    public function get($id){
        $product = Product::find($id);
        if ($product)
        {
            return $product;
        }
        return "not found";
    }

    // set Product Image
    private function addProductImage($product, $image)
    {
        $imageName = time().$image->getClientOriginalName();
        $image->move(public_path('images'), $imageName);
        $name = "/images/" . $imageName;
        DB::table('images')->updateOrInsert(['url'=>$name]);
        $product->images()->attach($name);
    }

    // add or delete product from favourite
    public function favourite(Request $request)
    {
        $user = $request->user();
        $product_id = $request->product_id;
        $user->products()->toggle([$product_id]);
    }
    
    // get user favourite products
    public function getFavouritesProducts(Request $request)
    {
        $user = $request->user();
        $user->load('products.images', 'products.promotion');
        $products = $user->products;
        return $products;
    }

    // add new Product
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
        return response('Product added successfully', 200);
    }

    // update an product
    public function update($id, Request $request){
        $product = Product::with('images', 'promotion')->find($id);
        if ($product->promotion && $product->promotion->promotion_price >= $request->price)
        {
            return back()->with(['error'=>"product price must be bigger then promotion price"]);
        }
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
        return response('Product updated successfully', 200);
    }

    // update product image
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

    // delete product image
    public function deleteProductImage(Request $request)
    {
        $url = $request->url;
        $image = Image::find($url);
        File::delete(public_path($url));
        $image->delete();
    }

    // delete product by id;
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

    public function getProductsByName(Request $request)
    {
        $query = $this->createQuery($request, null);
        $products = $query->get();
        return $products;
    }

    private function createQuery($request, $type)
    {
        /*
         get all products 
         if the product have promotion get the promotion data with it
         otherwise get only the product
        */
        $query = Product::with('images', 'category')
        ->leftJoin('promotions', 'promotions.product_id', '=', 'products.id')
        ->select('products.*', 'promotions.promotion_price', 'promotions.active');

        if ($request->has('title'))
        {
            // sort products with product title
            $title = $request->input('title');
            $query->where('title', 'like', '%'.$title.'%');
        }
 
        if($request->has('sort'))
        {
            $this->sortProducts($request->input('sort'), $query);
        }
        return $query;
    }

    private function sortProducts($sort, $query)
    {
        switch ($sort) {
            case 2:
                $query->orderByRaw('
                    CASE 
                        WHEN promotions.active = 1 THEN promotions.promotion_price 
                        ELSE products.price
                    END ASC
                ');
                break; 
            case 3:
                $query->orderByRaw('
                    CASE 
                        WHEN promotions.active = 1 THEN promotions.promotion_price 
                        ELSE products.price
                    END DESC
                ');
                break;
            case 4:
                $query->orderBy('products.created_at', 'desc');
                break;
        }
    }
    // get featured products
    public function featured_api()
    {
        $promotions = Product::inRandomOrder()->limit(4)->with('images', 'category', 'promotion')->get();
        return $promotions;
    }
    
    // get 4 man products
    public function man_api()
    {
        $man = Product::where('category_id', 2)->inRandomOrder()->limit(4)->with('images', 'category', 'promotion')->get();
        return $man;
    }

    // get 4 woman products
    public function woman_api()
    {
        $woman = Product::where('category_id', 1)->inRandomOrder()->limit(4)->with('images', 'category', 'promotion')->get();
        return $woman;
    }

    // get all products
    public function featured_api_all()
    {
        $promotions = Product::inRandomOrder()->with('images', 'category', 'promotion')->get();
        return $promotions;
    }
    
    // get all man products
    public function man_api_all()
    {
        $man = Product::where('category_id', 2)->inRandomOrder()->with('images', 'category', 'promotion')->get();
        return $man;
    }
    
    // get all woman products
    public function woman_api_all()
    {
        $woman = Product::where('category_id', 1)->inRandomOrder()->with('images', 'category', 'promotion')->get();
        return $woman;
    }

    // add total prodducts to products_overview
    public function trackProducts(Request $request)
    {
        DB::table('products_overview')->insert(['date_created'=>$request->date,'total_products'=>$request->total_products]);
    }

    // delete total prodducts from products_overview
    public function deleteTrack($id)
    {
        DB::table('products_overview')->where('id', $id)->delete();
    }
}
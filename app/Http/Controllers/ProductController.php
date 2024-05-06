<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{

    public function all(){
        $products = Product::all();
        return $products;
    }
    
    public function get($id){
        $product = Product::find($id);
        if ($product)
        {
            return $product;
        }
        return "not found";
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
        $images = [];
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imageName = time().$image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);
            $name = "/images/" . $imageName;
            $images[] = $name;
            DB::table('images')->updateOrInsert(['url'=>$name]);
        }
        if($request->hasFile('image2')){
            $image = $request->file('image2');
            $imageName = time().$image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);
            $name = "/images/" . $imageName;
            $images[] = $name;
            DB::table('images')->updateOrInsert(['url'=>$name]);
        }
        if($request->hasFile('image3')){
            $image = $request->file('image3');
            $imageName = time().$image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);
            $name = "/images/" . $imageName;
            $images[] = $name;
            DB::table('images')->updateOrInsert(['url'=>$name]);
        }
        $product->images()->sync($images);
    }

    public function update($id, Request $request){
        $product = Product::find($id);
        $product->title = $request->title;
        $product->category_id = $request->category;
        $product->description = $request->description;
        $product->Qty = $request->Q;
        $product->price = $request->price;
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            File::delete(public_path('images/' . $product->image));
            $product->image  = $imageName;
        }        
        $product->save();
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
}

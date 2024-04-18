<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\File;

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
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => ['required'],
        ]);
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $product = new Product();
            $product->title  = $request->input('title');
            $product->description = $request->input('description');
            $product->category_id = $request->input('category');
            $product->Qty  = $request->input('Q');
            $product->price  = $request->input('price');
            $product->image  = $imageName;
            $product->save();
        }
    }

    public function update($id, Request $request){
        $product = Product::find($id);
        $product->title = $request->input('title');
        $product->category_id = $request->input('category');
        $product->description = $request->input('description');
        $product->Qty = $request->input('Q');
        $product->price = $request->input('price');
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
        $product = Product::find($id);
        File::delete(public_path('images/' . $product->image));
        $product->delete();
    }
}

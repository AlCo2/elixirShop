<?php

namespace App\Http\Controllers;
use App\Models\Promotion;
use App\Models\Product;
use Illuminate\Http\Request;

class PromotionController extends Controller
{

    public function all()
    {
        $promotions = Promotion::inRandomOrder()->with('product', 'product.category', 'product.images')->where('active', true)->get();
        return $promotions;
    }

    public function allProducts()
    {
        $promotions = Product::whereHas('promotion')->inRandomOrder()->with('images', 'category', 'promotion')->get();
        return $promotions;
    }

    public function createNewPromotion(Request $request)
    {
        $request->validate([
            "product_id" => "required",
            "promotion_price" => "required",
        ]);
        $product = Product::find($request->product_id);
        if ($product->price < $request->promotion_price)
            return;
        $promotion = new Promotion();
        $promotion->product_id = $product->id;
        $promotion->promotion_price = $request->promotion_price;
        $promotion->active = $request->active;
        $promotion->save();
    }

    public function updatePromotion($id, Request $request)
    {
        $request->validate([
            "promotion_price" => "required"
        ]);
        $promotion = Promotion::with('product')->find($id);
        if ($promotion->product->price < $request->promotion_price)
            return;
        $promotion->promotion_price = $request->promotion_price;
        $promotion->active = $request->active;
        $promotion->save();
    }

    public function deletePromotion($id)
    {
        $promotion = Promotion::find($id);
        $promotion->delete();
    }
}

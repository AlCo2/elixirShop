<?php

namespace App\Http\Controllers;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{

    public function all()
    {
        $promotions = Promotion::inRandomOrder()->with('product', 'product.category', 'product.images')->where('active', true)->get();
        return $promotions;
    }
    public function createNewPromotion(Request $request)
    {
        $request->validate([
            "product_id" => "required",
            "promotion_price" => "required",
        ]);

        $promotion = new Promotion();
        $promotion->product_id = $request->product_id;
        $promotion->promotion_price = $request->promotion_price;
        $promotion->active = $request->active;
        $promotion->save();
    }

    public function updatePromotion($id, Request $request)
    {
        $request->validate([
            "promotion_price" => "required"
        ]);
        $promotion = Promotion::find($id);
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

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\Promotion;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = File::get(base_path('../../python/scrapProducts/parfum.json'));
        $json = json_decode(json: $contents, associative: true);
        $products = [];
        foreach ($json as $product){
            $images = [];
            foreach ($product['images'] as $image){
                $images[] = '/'.$image;
                DB::table('images')->updateOrInsert(['url'=>'/'.$image]);
            }
            $p = new Product();
            $p->title = $product['title'];
            $p->price = $product['promotion_price'];
            $p->category_id = $product['category_id'];
            $p->description = $product['description'];
            $p->Qty = 100;
            $p->save();
            $p->images()->sync($images);
            $promotion = new Promotion();
            $promotion->product_id = $p->id;
            $promotion->promotion_price = $product['price'];
            $promotion->active = true;
            $promotion->save();
        }
    }
}

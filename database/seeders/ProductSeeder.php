<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = Http::get('https://api.escuelajs.co/api/v1/products');
        $jsonData = $response->json();
        $products = [];
        foreach ($jsonData as $product){
            $images = [];
            foreach ($product['images'] as $image){
                $images[] = $image;
                DB::table('images')->updateOrInsert(['url'=>$image]);
            }
            $p = new Product();
            $p->title = $product['title'];
            $p->price = $product['price'];
            $p->category_id = $product['category']['id'];
            $p->description = $product['description'];
            $p->Qty = 100;
            $p->save();
            $p->images()->sync($images);
        }
    }
}

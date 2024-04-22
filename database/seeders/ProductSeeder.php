<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

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
            $products[] = [
                'title'=>$product['title'],
                'price'=>$product['price'],
                'category_id'=>$product['category']['id'],
                'description'=>$product['description'],
                'image'=>$product['images'][0],
                'Qty'=>100,
            ];
        }
        DB::table('products')->insert($products);
    }
}

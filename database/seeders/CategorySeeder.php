<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = Http::get('https://api.escuelajs.co/api/v1/categories');
        $jsonData = $response->json();
        $categories = [];
        foreach ($jsonData as $category){
            $categories[] = [
                'id'=>$category['id'],
                'name'=>$category['name']
            ];
        }
        DB::table('categories')->insert($categories);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $status = [
            ['status'=>'Pending'],
            ['status'=>'Completed'],
            ['status'=>'Declined'],
        ];
        DB::table('order_statuses')->insert($status); 
    }
}

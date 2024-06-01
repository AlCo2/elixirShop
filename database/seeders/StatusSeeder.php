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
        $order_statuses = [
            ['status'=>'Pending'],
            ['status'=>'Completed'],
            ['status'=>'Declined'],
        ];
        $message_statuses = [
            ['status'=>'Pending'],
            ['status'=>'Seen'],
            ['status'=>'Replied'],
        ];
        DB::table('order_statuses')->insert($order_statuses); 
        DB::table('message_statuses')->insert($message_statuses);
    }
}

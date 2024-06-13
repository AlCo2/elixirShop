<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Order;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class Order_itemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        $product = Product::inRandomOrder()->with('promotion')->first();
        $qty = fake()->numberBetween(1, 2);
        return [
            'order_id' => Order::factory(),
            'product_id' => $product->id,
            'Qty' => $qty,
            'total' => $qty * ($product->promotion?$product->promotion->promotion_price:$product->price),
        ];
    }
}

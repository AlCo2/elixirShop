<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Order_item;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'total' => fake()->randomNumber(4, false),
            'status_id' => fake()->numberBetween(1, 3),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Order $order) {
            Order_detail::factory()->create(['order_id' => $order->id]);
            Order_item::factory(3)->create(['order_id' => $order->id]);
        });
    }
}

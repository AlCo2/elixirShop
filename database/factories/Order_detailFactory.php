<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class Order_detailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'firstname' => fake()->firstName(),
            'lastname' => fake()->lastName(),
            'country' => fake()->state(),
            'city' => fake()->city(),
            'address' => fake()->streetAddress(),
            'zip' => fake()->postcode(),
            'phone' => fake()->phoneNumber(),
        ];
    }
}

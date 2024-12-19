<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Database\Seeders\RoleSeeder;
use App\Models\Product;
use App\Models\User;

class ProductTest extends TestCase
{
    use RefreshDatabase;
    protected $seeder = RoleSeeder::class;
    /**
     * A basic test example.
     */
    public function test_create_new_product(): void
    {
        $admin = User::factory()->create();
        $admin->role_id = 1;
        $response = $this->actingAs($admin)->post('/product', [
            'title' => "test",
            'Q' => 100,
            'price'=>300,
        ]);
        $response->assertStatus(200);
    }
    
    // TODO: Fix this test
    public function test_update_product()
    {
        $product = Product::factory()->create();
        $admin = User::factory()->create();
        $admin->role_id = 1;
        $product->title = "testTitle";
        $url = '/product/'. $product->id;
        $response = $this->actingAs($admin)->post($url, [$product]);
        $response->assertStatus(200);
        $product->refresh();
        $this->assertSame('testTitle', $product->title);
    }
}

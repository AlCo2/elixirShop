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
            'Qty' => 100,
            'price'=>300,
        ]);
        $response->assertStatus(200);
    }
    
    public function test_update_product()
    {
        $product = Product::factory()->create();
        $admin = User::factory()->create();
        $admin->role_id = 1;
        $data = [
            'title'=>"testTitle",
            'price'=>200,
            'Qty'=>10,
        ];
        $url = '/product/'. $product->id;
        $response = $this->actingAs($admin)->post($url, $data);
        $response->assertStatus(200);
        $product->refresh();
        $this->assertSame('testTitle', $product->title);
        $this->assertSame(200, $product->price);
        $this->assertSame(10, $product->Qty);
    }

    public function test_delete_product()
    {
        $product = Product::factory()->create();
        $admin = User::factory()->create();
        $admin->role_id = 1;
        $url = '/product/'. $product->id;

        $this->actingAs($admin)->delete($url);
        $this->assertNull($product->fresh());
    }
}

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;

class CheckPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_page_working(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
    public function test_store_page_working(): void
    {
        $response = $this->get('/store');
        $response->assertStatus(200);
    }
    public function test_man_page_working(): void
    {
        $response = $this->get('/store/man');
        $response->assertStatus(200);
    }
    public function test_woman_page_working(): void
    {
        $response = $this->get('/store/woman');
        $response->assertStatus(200);
    }
    public function test_checkout_page_working(): void
    {
        $response = $this->get('/checkout');
        $response->assertStatus(200);
    }
    
    public function test_checkorder_page_working(): void
    {
        $response = $this->get('/checkorder');
        $response->assertStatus(200);
    }
    
    public function test_support_page_working(): void
    {
        $response = $this->get('/support');
        $response->assertStatus(200);   
    }
    
    public function test_product_page_working(): void
    {
        $product = Product::factory()->create();
        $response = $this->get('/store/product/1');
        $response->assertStatus(200);   
    }
}

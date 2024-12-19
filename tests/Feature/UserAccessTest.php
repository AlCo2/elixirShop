<?php

namespace Tests\Feature\Role;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Database\Seeders\RoleSeeder;
use Tests\TestCase;
use App\Models\User;

class UserAccessTest extends TestCase
{
    
    use RefreshDatabase;

    protected $seeder = RoleSeeder::class;

    public function test_guest_cannot_access_to_dashboard(): void
    {   
        $response = $this->get('/dashboard');
        $response->assertRedirect('/login');
    }

    public function test_user_cannot_access_to_dashboard(): void
    {   
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/dashboard');
        $response->assertStatus(500);
    }

    public function test_admin_can_access_to_dashboard(): void
    {
        $admin = User::factory()->create();
        $admin->role_id = 1;
        $response = $this->actingAs($admin)->get('/dashboard');
        $response->assertStatus(200);
    }

    public function test_user_cannot_access_checkout_without_products_in_cart():void
    {
        $response = $this->get('/checkout/fastcheckout');
        $response->assertRedirect('/');
    }
}

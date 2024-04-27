<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class CartController extends Controller
{

    public function addToCart(Request $request): void
    {
        $product_id = $request->product_id;
        
        // create cart if not exist
        if (!$this->isCartExist()){
            $this->createCart();
        }
        
        if ($this->isProductInCart($product_id))
        {
            $this->incrementProduct($product_id);
        }
        else
        {
            $this->addProduct($product_id);
        }
    }

    public function subFromCart(Request $request): void
    {
        $product_id = $request->product_id;
        $this->decrementProduct($product_id);
    }

    public function deleteFromCart(Request $request): void
    {
        $product_id = $request->input('product_id');
        $cart = $this->getCart();
        unset($cart[$product_id]);
        $this->updateCart($cart);
    }
    
    private function getCart(): array
    {
        return session('cart');
    }

    private function updateCart($data): void
    {
        session(['cart'=>$data]);
    }
    
    private function isProductInCart($product_id): bool
    {
        $cart = $this->getCart();
        return isset($cart[$product_id]);
    }

    private function addProduct($product_id): void
    {
        $cart = $this->getCart();
        $product = Product::with('images')->find($product_id);
        $cart[$product_id] = [
            'product' => $product,
            'Q' => 1
        ];
        $this->updateCart($cart);
    }

    private function incrementProduct($id): void
    {
        $cart = $this->getCart();
        $cart[$id]['Q'] += 1;
        $this->updateCart($cart);
    }

    private function decrementProduct($id): void
    {
        $cart = $this->getCart();
        if ($cart[$id]['Q'] > 1)
            $cart[$id]['Q'] -= 1;
        $this->updateCart($cart);
    }

    private function isCartExist(): bool
    {
        return session()->has('cart');
    }
    
    private function createCart(): void
    {
        session(['cart'=>[]]);
    }
}

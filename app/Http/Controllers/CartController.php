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

    public function getCartProducts(Request $request)
    {
        $products = [];
        $total = 0;
        // get each product from the cart, and calculate the total
        foreach ($request->get('data') as $key => $value)
        {
            $product = Product::with('images', 'category', 'promotion')->find($key);
            $products[] = $product;
            if ($product->promotion) {
                $total += $product->promotion['promotion_price'] * $value;
            }
            else {
                $total += $product->price * $value;
            }
        }
        return [
            'total' => $total,
            'products' => $products,
        ];
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
        $price = 0;
        if ($this->isPromotionActive($cart[$product_id]['product']))
            $price = $cart[$product_id]['product']['promotion']->promotion_price * $cart[$product_id]['Q'];
        else
            $price = $cart[$product_id]['product']->price * $cart[$product_id]['Q'];
        $this->decrementTotal($price);
        unset($cart[$product_id]);
        $this->updateCart($cart);
    }

    public function deleteAllFromCart()
    {
        session()->forget('cart');
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
        $product = Product::with('images', 'promotion')->find($product_id);
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
        $price = 0;
        if ($this->isPromotionActive($cart[$id]['product']))
            $price = $cart[$id]['product']['promotion']->promotion_price;
        else
            $price = $cart[$id]['product']->price;
        $this->incrementTotal($price);
        $this->updateCart($cart);
    }

    private function decrementProduct($id): void
    {
        $cart = $this->getCart();
        if ($cart[$id]['Q'] > 1)
        {
            $cart[$id]['Q'] -= 1;
            $price = 0;
            if ($this->isPromotionActive($cart[$id]['product']))
                $price = $cart[$id]['product']['promotion']->promotion_price;
            else
                $price = $cart[$id]['product']->price;
            $this->decrementTotal($price);
        }
        $this->updateCart($cart);
    }

    private function incrementTotal($price)
    {
        $total = session('total');
        $total += $price;
        session(['total'=>$total]);
    }

    private function decrementTotal($price)
    {
        $total = session('total');
        $total -= $price;
        session(['total'=>$total]);
    }

    private function isPromotionActive($product)
    {
        return isset($product['promotion']) && $product['promotion']->active;
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

<?php

use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\UserController;


/* Get Request */
Route::get('/product/featured',[ProductController::class, 'featured_api']);
Route::get('/product/man',[ProductController::class, 'man_api']);
Route::get('/product/woman',[ProductController::class, 'woman_api']);
Route::get('/product/featured/all',[ProductController::class, 'featured_api_all']);
Route::get('/product/man/all',[ProductController::class, 'man_api_all']);
Route::get('/product/woman/all',[ProductController::class, 'woman_api_all']);
Route::get('/user',[UserController::class, 'getAuthUser'])->middleware('auth:sanctum');
Route::get('/categories', [CategoryController::class, 'all']);
Route::get('/products', [ProductController::class, 'all']);
Route::get('/promotions',[PromotionController::class, 'allProducts']);
Route::get('/countries', [CheckoutController::class, 'getCountries']);
Route::get('/checkout', [CheckoutController::class, 'checkout_api']);

/* Post Request */
Route::post('/login', [AuthenticatedSessionController::class, 'store_api']);
Route::post('/register', [RegisteredUserController::class, 'store_api']);
Route::post('/cartproducts', [CartController::class, 'getCartProducts']);
Route::post('/favourite', [ProductController::class, 'addProductToFavourit'])->middleware('auth:sanctum');
Route::post('/favourite/products', [ProductController::class, 'getFavouriteProducts'])->middleware('auth:sanctum');
Route::post('/order', [OrderController::class, 'createOrderAPI']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy_api']);
});

Route::get('/test', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

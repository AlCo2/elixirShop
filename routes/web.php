<?php

use App\Http\Controllers\ProfileController;
Use App\Http\Controllers\StoreController;
Use App\Http\Controllers\ProductController;
Use App\Http\Controllers\CategoryController;
Use App\Http\Controllers\DashboardController;
Use App\Http\Controllers\PromotionController;
Use App\Http\Controllers\CheckoutController;
Use App\Http\Controllers\UserController;
Use App\Http\Controllers\OrderController;
Use App\Http\Controllers\CartController;
Use App\Http\Controllers\SupportController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* main Pages */
Route::get('/',[StoreController::class, 'home']);
Route::get('/store',[StoreController::class, 'index']);
Route::get('/store/man',[StoreController::class, 'manPage']);
Route::get('/store/woman',[StoreController::class, 'womanPage']);
Route::get('/store/product/{id}',[StoreController::class, 'product']);
Route::get('/checkout',[CheckoutController::class, 'index']);
Route::get('/checkout/fastcheckout',[CheckoutController::class, 'checkout']);
Route::get('/checkorder', [OrderController::class, 'checkOrder']);
Route::get('/orders', [OrderController::class, 'listUserOrders'])->middleware('auth');
Route::get('/showorder', [OrderController::class, 'showOrder']);
Route::get('/support', [SupportController::class, 'index']);

/*         Post request          */
Route::post('/cart', [CheckoutController::class, 'getCurrentCartData']);
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::post('/cart/sub', [CartController::class, 'subFromCart']);
Route::post('/cart/delete', [CartController::class, 'deleteFromCart']);
Route::post('/cart/deleteall', [CartController::class, 'deleteAllfromCart']);
Route::post('/message/create', [SupportController::class, 'createMessage']);
Route::post('/order/create', [OrderController::class, 'createOrder']);


/* auth routes */
Route::post('/favourite', [ProductController::class, 'addProductToFavourit'])->middleware('auth');
Route::post('/favourites/products', [ProductController::class, 'getFavouriteProducts'])->middleware('auth');

/* Admin routes */
Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    route::get('/dashboard', [DashboardController::class, 'overview']);
    route::get('/dashboard/customer', [DashboardController::class, 'customer']);
    route::get('/dashboard/product', [DashboardController::class, 'product']);
    route::get('/dashboard/product/track', [DashboardController::class, 'productTrack']);
    route::get('/dashboard/order', [DashboardController::class, 'order']);
    route::get('/dashboard/track', [DashboardController::class, 'track']);
    route::get('/dashboard/order/{id}', [OrderController::class, 'getDashboardOrderPage']);
    route::get('/dashboard/category', [DashboardController::class, 'category']);
    route::get('/dashboard/promotion', [DashboardController::class, 'promotion']);
    route::get('/dashboard/message', [DashboardController::class, 'message']);

    /* user API */
    Route::post('/user', [UserController::class, 'newUser']);
    Route::post('/user/{id}', [UserController::class, 'updateUser']);
    Route::delete('/user/{id}', [UserController::class, 'deleteUser']);

    /* product API */
    Route::get('/product', [ProductController::class, 'index']);
    Route::get('/product/{id}', [ProductController::class, 'show']);
    Route::post('/product', [ProductController::class, 'store']);
    Route::post('/product/{id}', [ProductController::class, 'update']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);
    
    Route::post('/products/track', [ProductController::class, 'trackProducts']);
    Route::delete('/products/track/delete/{id}', [ProductController::class, 'deleteTrack']);

    /* category API */
    Route::post('/category', [CategoryController::class, 'add']);
    Route::patch('/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/category/{id}', [CategoryController::class, 'delete']);

    /* order API */
    Route::patch('/order/{id}', [OrderController::class, 'updateOrderStatus']);
    Route::delete('/order/{id}', [OrderController::class, 'deleteOrder']);
    Route::post('/orders/track', [OrderController::class, 'track']);
    Route::delete('/orders/track/delete/{id}', [OrderController::class, 'deleteTrack']);

    /* promotion API */
    Route::post('/promotion', [PromotionController::class, 'createNewPromotion']);
    Route::patch('/promotion/{id}', [PromotionController::class, 'updatePromotion']);
    Route::delete('/promotion/{id}', [PromotionController::class, 'deletePromotion']);
    Route::post('/promotion/activateall', [PromotionController::class, 'activateAllPromotion']);
    Route::post('/promotion/desactivateall', [PromotionController::class, 'desactivateAllPromotion']);

    /* message API */
    route::post('/message/read', [SupportController::class, 'readMessage']);
    route::post('/message/removeseen', [SupportController::class, 'removeSeen']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

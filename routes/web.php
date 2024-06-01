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
Route::get('/orders', [OrderController::class, 'listUserOrders']);
Route::get('/showorder', [OrderController::class, 'showOrder']);
Route::get('/support', [SupportController::class, 'index']);

/*         Post request          */
Route::post('api/cart/', [CheckoutController::class, 'getCurrentCartData']);
Route::post('/api/cart/add', [CartController::class, 'addToCart']);
Route::post('/api/cart/sub', [CartController::class, 'subFromCart']);
Route::post('/api/cart/delete', [CartController::class, 'deleteFromCart']);
Route::post('/api/cart/deleteall', [CartController::class, 'deleteAllfromCart']);
Route::post('/message/create', [SupportController::class, 'createMessage']);
Route::post('/api/order/create', [OrderController::class, 'createOrder']);


/* auth routes */
Route::post('/favourite', [ProductController::class, 'favourite'])->middleware('auth');
Route::post('/favourites/products', [ProductController::class, 'getFavouritesProducts'])->middleware('auth');

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    route::get('/dashboard', [DashboardController::class, 'overview']);
    route::get('/dashboard/customer', [DashboardController::class, 'customer']);
    route::get('/dashboard/product', [DashboardController::class, 'product']);
    route::get('/dashboard/order', [DashboardController::class, 'order']);
    route::get('/dashboard/order/{id}', [OrderController::class, 'getDashboardOrderPage']);
    route::get('/dashboard/category', [DashboardController::class, 'category']);
    route::get('/dashboard/promotion', [DashboardController::class, 'promotion']);
    route::get('/dashboard/message', function(){
        return Inertia::render('dashboard/message/page');
    });

    /* user API */
    Route::post('/api/user', [UserController::class, 'newUser']);
    Route::post('/api/user/{id}', [UserController::class, 'updateUser']);
    Route::delete('/api/user/{id}', [UserController::class, 'deleteUser']);

    /* product API */
    Route::get('/api/product/', [ProductController::class, 'all']);
    Route::get('/api/product/{id}', [ProductController::class, 'get']);
    Route::post('/api/product/', [ProductController::class, 'add']);
    Route::post('/api/product/{id}', [ProductController::class, 'update']);
    Route::delete('/api/product/{id}', [ProductController::class, 'delete']);
    Route::post('/api/image/delete/', [ProductController::class, 'deleteProductImage']);

    /* category API */
    Route::get('/api/category/', [CategoryController::class, 'all']);
    Route::get('/api/category/{id}', [CategoryController::class, 'get']);
    Route::post('/api/category/', [CategoryController::class, 'add']);
    Route::patch('/api/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/api/category/{id}', [CategoryController::class, 'delete']);

    /* order API */
    Route::patch('/api/order/{id}', [OrderController::class, 'updateOrderStatus']);

    /* promotion API */
    Route::post('/api/promotion/', [PromotionController::class, 'createNewPromotion']);
    Route::patch('/api/promotion/{id}', [PromotionController::class, 'updatePromotion']);
    Route::delete('/api/promotion/{id}', [PromotionController::class, 'deletePromotion']);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

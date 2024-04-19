<?php

use App\Http\Controllers\ProfileController;
Use App\Http\Controllers\StoreController;
Use App\Http\Controllers\ProductController;
Use App\Http\Controllers\CategoryController;
Use App\Http\Controllers\DashboardController;
Use App\Http\Controllers\CheckoutController;
Use App\Http\Controllers\OrderController;
Use App\Http\Controllers\CartController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('page', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/* main Pages */
Route::get('/store',[StoreController::class, 'index']);
Route::get('/store/product/{id}',[StoreController::class, 'product']);
Route::get('/checkout',[CheckoutController::class, 'index']);
Route::get('/checkout/fastcheckout',[CheckoutController::class, 'checkout']);


/* Post request */
Route::post('/api/cart/add', [CartController::class, 'addToCart']);
Route::post('/api/cart/sub', [CartController::class, 'subFromCart']);
Route::post('/api/cart/delete', [CartController::class, 'deleteFromCart']);
Route::post('/api/order/create', [OrderController::class, 'createOrder']);

/*        Temp router:            */
Route::get('/checkorder', function(){
    return Inertia::render('checkorder/page');
});
Route::get('/promotions', function(){
    return Inertia::render('Promotions');
});

/* finish of temp router  */
Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/page');
    })->name('dashboard');
    route::get('/dashboard/customer', [DashboardController::class, 'customer']);
    route::get('/dashboard/product', [DashboardController::class, 'product']);
    route::get('/dashboard/order', [DashboardController::class, 'order']);
    route::get('/dashboard/category', [DashboardController::class, 'category']);
    route::get('/dashboard/message', function(){
        return Inertia::render('dashboard/message/page');
    });

    /* product API */
    Route::get('/api/product/', [ProductController::class, 'all']);
    Route::get('/api/product/{id}', [ProductController::class, 'get']);
    Route::post('/api/product/', [ProductController::class, 'add']);
    Route::post('/api/product/{id}', [ProductController::class, 'update']);
    Route::delete('/api/product/{id}', [ProductController::class, 'delete']);

    /* category API */
    Route::get('/api/category/', [CategoryController::class, 'all']);
    Route::get('/api/category/{id}', [CategoryController::class, 'get']);
    Route::post('/api/category/', [CategoryController::class, 'add']);
    Route::patch('/api/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/api/category/{id}', [CategoryController::class, 'delete']);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\ProfileController;
Use App\Http\Controllers\StoreController;
Use App\Http\Controllers\ProductController;
Use App\Http\Controllers\CheckoutController;
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

/* product API */
Route::get('/api/product/{id}', [ProductController::class, 'getProduct']);
Route::post('/api/product/', [ProductController::class, 'addProduct']);
Route::patch('/api/product/', [ProductController::class, 'updateProduct']);
Route::delete('/api/product/', [ProductController::class, 'deleteProduct']);


/*        Temp router:            */
Route::get('/checkorder', function(){
    return Inertia::render('checkorder/page');
});
Route::get('/promotions', function(){
    return Inertia::render('Promotions');
});

/* finish of temp router  */

Route::get('/dashboard', function () {
    return Inertia::render('dashboard/page');
})->middleware(['auth', 'verified', EnsureUserIsAdmin::class])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

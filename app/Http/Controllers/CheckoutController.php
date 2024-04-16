<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(){
        return Inertia::render('checkout/page');
    }
    public function checkout(){
        return Inertia::render('checkout/fastcheckout/page');
    }
}

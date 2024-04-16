<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index(){
        return Inertia::render('store/page');
    }

    public function product($id){
        return Inertia::render('store/product/page');
    }
}

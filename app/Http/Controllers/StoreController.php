<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index(){
        return Inertia::render('Store');
    }

    public function product($id){
        return Inertia::render('Product');
    }
}

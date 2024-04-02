<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function getProduct($id){
        return $id;
    }
    public function addProduct(Request $request){
        return $request;
    }

    public function updateProduct(Request $request){
        return $request;
    }

    public function deleteProduct(Request $request){
        return $request;
    }
}

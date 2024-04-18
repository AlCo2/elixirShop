<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function all(){
        $categories = Category::all();
        return $categories;
    }

    public function get($id){
        $category = Category::find($id);
        if ($category)
        {
            return $category;
        }
        return "not found";
    }
    public function add(Request $request){
        $category_name = $request->input('name');
        $category = new Category();
        $category->name = $category_name;
        $category->save();
    }

    public function update($id, Request $request){
        $new_category_name = $request->input('name');
        $category = Category::find($id);
        if ($category){
            $category->name = $new_category_name;
            $category->save();
        }
    }
    public function delete($id)
    {
        $category = Category::find($id);
        if ($category)
        {
            $category->delete();
        }
    }
}

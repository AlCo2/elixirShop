<?php

namespace App\Http\Services;

use App\Models\Image;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ImageService
{
    public function addProductImage($product, $image)
    {
        $imageName = time().$image->getClientOriginalName();
        $image->move(public_path('images'), $imageName);
        $name = "/images/" . $imageName;
        DB::table('images')->updateOrInsert(['url'=>$name]);
        $product->images()->attach($name);
    }

    public function updateProductImage($id, $product, $req_image)
    {
        $imageName = time().$id.$req_image->getClientOriginalName();
        $req_image->move(public_path('images'), $imageName);
        $name = "/images/" . $imageName;
        if (isset($product->images[$id]))
        {
            $url = $product->images[$id]->url;
            File::delete(public_path($url));
            $image = Image::find($url);
            $image->url = $name;
            $product->images()->detach($url);
            $image->save();
        }
        else
        {
            DB::table('images')->updateOrInsert(['url'=>$name]);
        }
        $product->images()->attach($name);
    }

    public function deleteProductImage($url)
    {
        $image = Image::findOrFail($url);
        File::delete(public_path($url));
        $image->delete();
    }

    public function deleteListOfImages(Image $images) {
        foreach($images as $image)
        {
            $url = $image->url;
            $image = Image::find($url);
            File::delete(public_path($url));
            $image->delete();
        }
    }
}

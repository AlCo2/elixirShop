<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{

    public function getAuthUser(Request $request)
    {
        return $request->user();
    }

    public function newUser(Request $request)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'password' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'role' => 'required',
        ]);

        $user = new User();
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->role_id = $request->role;
        $user->save();
    }

    public function updateUser($id, Request $request)
    {
        $user = User::find($id);
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        if ($request->password)
            $user->password = $request->password;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->role_id = $request->role;
        $user->save();
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        $auth = Auth()->user();
        if($user->id !== $auth->id)
            $user->delete();
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Message;
class SupportController extends Controller
{
    public function index()
    {
        return Inertia::render('support/page');
    }
    public function createMessage(Request $request)
    {
        $request->validate([
            'email'=> ['required', 'email'],
            'message'=>['required'],
        ]);
        return redirect('/')->with('success', 'your request has gone succesfuly');
    }
}

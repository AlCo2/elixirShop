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
            'message'=>['required']
        ]);
        $message = new Message();
        $message->email = $request->email;
        $message->message = $request->message;
        $message->save();
        return redirect('/')->with('success', 'your request has gone succesfuly');
    }

    public function readMessage(Request $request)
    {
        $id = $request->id;
        $message = Message::find($id);
        $message->status_id = 2;
        $message->save();
    }
    public function removeSeen(Request $request)
    {
        $id = $request->id;
        $message = Message::find($id);
        $message->status_id = 1;
        $message->save();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    public function index()
    {
        try {
            $claims = Claim::all();
            return response()->json($claims, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch claims', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        // Validate the request...
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'amount' => 'required|numeric',
            'claim_type' => 'required|string',
            'user_id' => 'required|string', // assuming user_id is an integer
            // other validation rules
        ]);

        // Create and save the claim...
        $claim = new Claim();
        $claim->title = $validatedData['title'];
        $claim->description = $validatedData['description'];
        $claim->amount = $validatedData['amount'];
        $claim->claim_type = $validatedData['claim_type'];
        $claim->user_id = $validatedData['user_id'];
        $claim->status = 'pending';
        $claim->save();

        // Return a response...
        return response()->json(['message' => 'Claim created successfully!', 'claim' => $claim], 201);
    }
}

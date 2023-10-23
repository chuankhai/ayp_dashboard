<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', // primary key
        'user_id',  // assuming a claim belongs to a user
        'title',    // title or summary of the claim
        'description', // detailed description or content of the claim
        'status',   // status of the claim (e.g. 'pending', 'approved', 'rejected')
        'amount', // amount claimed
        'claim_type' // type of claim
    ];

    /**
     * Get the user that owns the claim.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}

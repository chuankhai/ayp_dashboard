<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ClaimTest extends TestCase
{
    use RefreshDatabase; // This trait will ensure your test database is migrated and rolled back for each test.

    /** @test */
    public function can_fetch_claims()
    {
        // Given: There are 3 claims in the database.
        Claim::factory()->count(3)->create();

        // When: We hit the endpoint.
        $response = $this->getJson('/api/claims');

        // Then: We should receive those 3 claims in the response.
        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    /** @test */
    public function can_fetch_a_specific_claim()
    {
        // Given: A specific claim exists in the database.
        $claim = Claim::factory()->create(['title' => 'Test Claim']);

        // When: We hit the endpoint for that specific claim.
        $response = $this->getJson("/api/claims/{$claim->id}");

        // Then: We should receive that claim in the response.
        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => 'Test Claim']);
    }

}

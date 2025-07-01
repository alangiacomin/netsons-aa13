<?php

namespace App\Jobs\Fumetto;

use App\Jobs\Job;
use App\Models\Fumetto;
use Exception;
use Illuminate\Support\Facades\Log;

class CreaFumetto extends Job
{
    /**
     * Execute the job.
     *
     * @throws Exception
     */
    public function handle(): void
    {
        Log::info("CreaFumetto: {$this->job->attempts()}");
        Fumetto::create([
            'Titolo' => fake()->words(3, true),
            'Numero' => fake()->numberBetween(1, 200),
            // 'DataPubblicazione' => fake()->dateTime("-30 years"),
        ]);

        // throw new Exception('mia eccezione');
    }
}

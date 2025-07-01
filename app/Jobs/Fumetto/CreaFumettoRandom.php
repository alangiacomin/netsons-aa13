<?php

namespace App\Jobs\Fumetto;

use App\Jobs\Job;
use App\Models\Fumetto;
use Exception;

class CreaFumettoRandom extends Job
{
    public function __construct(public Fumetto $fumetto) {}

    /**
     * Execute the job.
     *
     * @throws Exception
     */
    public function handle(): void
    {
        print_r($this->fumetto);
        $this->fumetto->Titolo = fake()->words(3, true);
        $this->fumetto->Numero = fake()->numberBetween(1, 200);

        $this->fumetto->save();

        // throw new Exception('mia eccezione');
    }
}

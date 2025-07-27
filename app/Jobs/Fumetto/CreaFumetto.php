<?php

namespace App\Jobs\Fumetto;

use App\Jobs\Job;
use App\Models\Fumetto;
use Exception;
use Illuminate\Support\Facades\Log;

class CreaFumetto extends Job
{
    protected array $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @throws Exception
     */
    public function handle()
    {
        // print_r($fumetto);
        // echo 'Titolo: '.print_r($this->data['Titolo'], true)."\n";
        if ($this->job != null) {
            Log::info("CreaFumetto: {$this->job->attempts()}");
        }

        $ff = Fumetto::create([
            'DataPubblicazione' => fake()->dateTime('-30 years'),
            ...$this->data,
        ]);
        // print_r($ff);

        return $ff;
        // Fumetto::create([
        //     'Titolo' => fake()->words(3, true),
        //     'Numero' => fake()->numberBetween(1, 200),
        //     // 'DataPubblicazione' => fake()->dateTime("-30 years"),
        // ]);

        // throw new Exception('mia eccezione');
    }
}

<?php

namespace App\Jobs\Fumetto;

use App\Jobs\Job;
use App\Models\Fumetto;
use Exception;
use Illuminate\Support\Facades\Log;

class BulkInsertFumetti extends Job
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
            Log::info("BulkInsertFumetti: {$this->job->attempts()}");
        }

        $rows = array_map(function (array $item) {
            return [
                'DataPubblicazione' => fake()->dateTime('-30 years'),
                ...$item,
            ];
        }, $this->data);

        $numeri = array_map(fn ($r) => $r['Numero'], $rows);

        $ff = Fumetto::insert($rows);

        $inserted = Fumetto::whereIn('Numero', $numeri)
            ->get();

        // print_r($ff);

        return $inserted;
        // Fumetto::create([
        //     'Titolo' => fake()->words(3, true),
        //     'Numero' => fake()->numberBetween(1, 200),
        //     // 'DataPubblicazione' => fake()->dateTime("-30 years"),
        // ]);

        // throw new Exception('mia eccezione');
    }
}

<?php

namespace Database\Factories;

use App\Services\TextScraper\AlboTex;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlboTexFactory extends Factory
{
    protected $model = AlboTex::class;

    public function make2($attributes = [], ?AlboTex $parent = null): AlboTex
    {
        $data = array_merge($this->definition(), $attributes);

        return new AlboTex(
            numero: (string) $data['numero'],
            titolo: $data['titolo'],
            mesePubblicazione: $data['mesePubblicazione'],
            anno: (int) $data['anno'],
        );
    }

    public function make($attributes = [], ?AlboTex $parent = null): AlboTex

    public function definition()
    {
        return [
            'numero' => $this->faker->numberBetween(1, 999),
            'titolo' => $this->faker->sentence(3),
            'mesePubblicazione' => $this->faker->monthName(),
            'anno' => $this->faker->year(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Fumetto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Fumetto>
 */
class FumettoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'Titolo' => fake()->name(),
            'Numero' => fake()->numberBetween(1, 200),
            'DataPubblicazione' => fake()->date(),
        ];
    }
}

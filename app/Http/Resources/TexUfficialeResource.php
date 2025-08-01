<?php

namespace App\Http\Resources;

use App\Services\TextScraper\AlboTex;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin AlboTex
 */
class TexUfficialeResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'Numero' => $this->numero,
            'Titolo' => $this->titolo,
            'MesePubblicazione' => $this->mesePubblicazione,
            'Anno' => $this->anno,
        ];
    }
}

/**
 * @property int $numero
 * @property string $titolo
 * @property string $mesePubblicazione
 * @property int $anno
 */

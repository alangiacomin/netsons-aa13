<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FumettoResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'Id' => (int) $this->id,
            'Numero' => (int) $this->Numero,
            'Titolo' => $this->Titolo,
            'DataPubblicazione' => $this->DataPubblicazione,
        ];
    }
}

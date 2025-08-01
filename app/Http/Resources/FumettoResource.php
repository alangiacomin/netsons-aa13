<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $Numero
 * @property string $Titolo
 * @property Carbon $DataPubblicazione
 * @property bool $DataEsatta
 */
class FumettoResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'Id' => $this->id,
            'Numero' => $this->Numero,
            'Titolo' => $this->Titolo,
            'DataPubblicazione' => $this->DataPubblicazione, // ->format('d/m/Y'),
            'DataEsatta' => $this->DataEsatta,
        ];
    }
}

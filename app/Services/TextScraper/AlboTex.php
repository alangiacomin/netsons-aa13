<?php

namespace App\Services\TextScraper;

class AlboTex
{
    /**
     * @var string Numero dell'albo
     */
    public string $numero;

    /**
     * @var string Titolo dell'albo
     */
    public string $titolo;

    /**
     * @var string Mese di pubblicazione
     */
    public string $mesePubblicazione;

    /**
     * @var int Anno di pubblicazione
     */
    public int $anno;

    public function __construct(
        string $numero = '',
        string $titolo = '',
        string $mesePubblicazione = '',
        int $anno = 0
    ) {
        $this->numero = $numero;
        $this->titolo = $titolo;
        $this->mesePubblicazione = $mesePubblicazione;
        $this->anno = $anno;
    }
}

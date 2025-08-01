<?php

namespace App\Services\TextScraper;

interface ITextScraperService
{
    /**
     * Ricerca gli albi dalla pagina web
     *
     * @return AlboTex[] Lista albi trovati
     */
    public function fetch(): array;
}

<?php

namespace App\Services\TextScraper;

use App\Services\IService;
use DOMDocument;

class TextScraperService implements IService, ITextScraperService
{
    /**
     * @var string Url pagina da analizzare
     */
    private string $url = 'https://it.wikipedia.org/wiki/Albi_di_Tex';

    /**
     * @var AlboTex[] Lista albi trovati
     */
    private array $albi = [];

    public function fetch(): array
    {
        $html = file_get_contents($this->url);
        if (!$html) {
            return $this->albi;
        }

        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        $dom->loadHTML($html);
        libxml_clear_errors();

        $tables = $dom->getElementsByTagName('table');
        $data = [];

        $tablesArray = iterator_to_array($tables); // ora è un vero array
        $tables = array_slice($tablesArray, 0, 3); // primi 10 anni

        foreach ($tables as $table) {
            if ($table->getAttribute('class') === 'wikitable') {
                $rows = $table->getElementsByTagName('tr');
                $anno_corrente = null;

                // naviga il dom precedente per trovare il tag con l'anno
                $node = $table;
                while ($node = $node->previousSibling) {
                    if ($node->nodeType === XML_ELEMENT_NODE
                        && $node->nodeName === 'div'
                        && $node->hasAttributes()
                        && in_array('mw-heading', preg_split('/\s+/', trim($node->getAttribute('class'))))
                    ) {
                        // Trova il tag h2 dentro questo div
                        foreach ($node->childNodes as $child) {
                            if ($child->nodeType === XML_ELEMENT_NODE && $child->nodeName === 'h2') {
                                $anno_corrente = trim($child->textContent);
                                break 2; // esce sia dal foreach che dal while
                            }
                        }
                    }
                }

                // naviga la tabella con tutti gli albi dell'anno
                foreach ($rows as $row) {
                    $tds = $row->getElementsByTagName('td');
                    if ($tds->length >= 4) {
                        $numero = trim($tds->item(0)->textContent);
                        $titolo = trim($tds->item(1)->textContent);
                        $data_pubblicazione = trim($tds->item(2)->textContent);
                        $autore = trim($tds->item(3)->textContent);

                        $matches = [];
                        $mese = '';
                        if (preg_match('/([a-zàèéìòù]+)/iu', $data_pubblicazione, $matches)) {
                            $mese = ucfirst(strtolower(trim($matches[1])));
                        }

                        $this->albi[] = new AlboTex(
                            $numero,
                            $titolo,
                            $mese,
                            $anno_corrente
                        );
                    }
                }
            }
        }

        return $this->albi;
    }
}

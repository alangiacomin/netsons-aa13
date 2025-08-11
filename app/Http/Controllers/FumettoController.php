<?php

namespace App\Http\Controllers;

use App\Http\Requests\Fumetto\StoreFumettiBulkRequest;
use App\Http\Requests\Fumetto\StoreFumettoRequest;
use App\Http\Requests\Fumetto\UpdateFumettoRequest;
use App\Http\Resources\FumettoResource;
use App\Http\Resources\TexUfficialeResource;
use App\Jobs\Fumetto\BulkInsertFumetti;
use App\Jobs\Fumetto\CreaFumetto;
use App\Jobs\Fumetto\CreaFumettoRandom;
use App\Models\Fumetto;
use App\Services\TextScraper\TextScraperService;
use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpFoundation\Response;

/**
 * @group Fumetto
 */
class FumettoController extends Controller
{
    public function __construct()
    {
        // $this->authorizeResource(Fumetto::class, 'fumetto');
    }

    /**
     * List
     *
     * Display a listing of the resource.
     *
     * @apiResourceCollection  App\Http\Resources\FumettoResource
     *
     * @apiResourceModel       App\Models\Fumetto
     */
    public function index()
    {
        //
        // CreaFumettoRandom::dispatch();

        return FumettoResource::collection(Fumetto::all()->sortBy(['Numero', 'DataPubblicazione']));
    }

    /**
     * Store
     *
     * Store a newly created resource in storage.
     *
     * @param  StoreFumettoRequest  $request  dati da salvare
     *
     * @apiResource            App\Http\Resources\FumettoResource
     *
     * @apiResourceModel       App\Models\Fumetto
     */
    public function store(StoreFumettoRequest $request): JsonResource
    {
        $ret = CreaFumetto::execute([...$request->validated()]);

        return new FumettoResource($ret);
    }

    /**
     * Store bulk
     *
     * @apiResourceCollection  App\Http\Resources\FumettoResource
     *
     * @apiResourceModel       App\Models\Fumetto
     */
    public function storeBulk(StoreFumettiBulkRequest $request)
    {
        $payload = $request->validated();
        $fumetti = $payload['fumetti'];

        // Manda il Job sulla coda (usa la connessione Redis configurata)
        $bk = BulkInsertFumetti::execute($fumetti);

        return FumettoResource::collection($bk);
    }

    /**
     * Show
     *
     * Display the specified resource.
     *
     * @param  Fumetto  $fumetto  ID Del fumetto
     *
     * @apiResource            App\Http\Resources\FumettoResource
     *
     * @apiResourceModel       App\Models\Fumetto
     */
    public function show(Fumetto $fumetto)
    {
        return new FumettoResource($fumetto);
    }

    /**
     * Update
     *
     * Update the specified resource in storage.
     *
     * @apiResource            App\Http\Resources\FumettoResource
     *
     * @apiResourceModel       App\Models\Fumetto
     */
    public function update(UpdateFumettoRequest $request, Fumetto $fumetto)
    {
        //
        // return response()->json($fumetto, Response::HTTP_OK);
        $ret = CreaFumettoRandom::execute($fumetto);

        return new FumettoResource($ret);
    }

    /**
     * Remove
     *
     * Remove the specified resource from storage.
     */
    public function destroy(Fumetto $fumetto)
    {
        $fumetto->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @apiResourceCollection App\Http\Resources\TexUfficialeResource
     *
     * @apiResourceModel \App\Models\Fumetto
     */
    public function getListMancanti()
    {
        $scraper = new TextScraperService();

        $data = $scraper->fetch();

        $presenti = Fumetto::all();

        // Raccogli tutti i numeri già presenti
        $numeriPresenti = $presenti->pluck('Numero')->toArray();
        // print_r($numeriPresenti);

        // Filtra i mancanti
        $mancanti = array_filter($data, function ($albo) use ($numeriPresenti) {
            return !in_array($albo->numero, $numeriPresenti);
        });

        return TexUfficialeResource::collection($mancanti);
    }
}

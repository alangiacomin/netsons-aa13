<?php

namespace App\Http\Controllers\Fumetto;

use App\Http\Controllers\Controller;
use App\Http\Requests\Fumetto\StoreFumettoRequest;
use App\Http\Requests\Fumetto\UpdateFumettoRequest;
use App\Http\Resources\FumettoResource;
use App\Jobs\Fumetto\CreaFumetto;
use App\Jobs\Fumetto\CreaFumettoRandom;
use App\Models\Fumetto;
use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpFoundation\Response;

/**
 * @group Fumetto
 */
class FumettoBisController extends Controller
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

        return FumettoResource::collection(Fumetto::all());
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
}

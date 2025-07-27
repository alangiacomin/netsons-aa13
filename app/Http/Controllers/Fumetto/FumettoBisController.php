<?php

namespace App\Http\Controllers\Fumetto;

use App\Http\Controllers\Controller;
use App\Http\Requests\Fumetto\StoreFumettoRequest;
use App\Http\Requests\Fumetto\UpdateFumettoRequest;
use App\Jobs\Fumetto\CreaFumetto;
use App\Jobs\Fumetto\CreaFumettoRandom;
use App\Models\Fumetto;
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
     */
    public function index()
    {
        //
        // CreaFumettoRandom::dispatch();

        return response()->json(Fumetto::all(), Response::HTTP_OK);
    }

    /**
     * Store
     *
     * Store a newly created resource in storage.
     *
     * @param  StoreFumettoRequest  $request  dati da salvere
     */
    public function store(StoreFumettoRequest $request)
    {
        //
        $ret = CreaFumetto::dispatch($request->validated());

        return response()->json($ret, Response::HTTP_CREATED);
    }

    /**
     * Show
     *
     * Display the specified resource.
     *
     * @param  Fumetto  $fumetto  ID Del fumetto
     */
    public function show(Fumetto $fumetto)
    {
        //
    }

    /**
     * Update
     *
     * Update the specified resource in storage.
     */
    public function update(UpdateFumettoRequest $request, Fumetto $fumetto)
    {
        //
        // return response()->json($fumetto, Response::HTTP_OK);
        CreaFumettoRandom::execute($fumetto);
    }

    /**
     * Remove
     *
     * Remove the specified resource from storage.
     */
    public function destroy(Fumetto $fumetto)
    {
        //
    }
}

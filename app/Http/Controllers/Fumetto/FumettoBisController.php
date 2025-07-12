<?php

namespace App\Http\Controllers\Fumetto;

use App\Http\Controllers\Controller;
use App\Http\Requests\Fumetto\StoreFumettoRequest;
use App\Http\Requests\Fumetto\UpdateFumettoRequest;
use App\Jobs\Fumetto\CreaFumetto;
use App\Jobs\Fumetto\CreaFumettoRandom;
use App\Models\Fumetto;
use Symfony\Component\HttpFoundation\Response;

class FumettoBisController extends Controller
{
    public function __construct()
    {
        // $this->authorizeResource(Fumetto::class, 'fumetto');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // CreaFumettoRandom::dispatch();

        return view('home');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFumettoRequest $request)
    {
        //
        $ret = CreaFumetto::dispatch($request->validated());

        return response()->json($ret, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fumetto $fumetto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFumettoRequest $request, Fumetto $fumetto)
    {
        //
        // return response()->json($fumetto, Response::HTTP_OK);
        CreaFumettoRandom::execute($fumetto);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fumetto $fumetto)
    {
        //
    }
}

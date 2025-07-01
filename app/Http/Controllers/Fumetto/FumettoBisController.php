<?php

namespace App\Http\Controllers\Fumetto;

use App\Http\Controllers\Controller;
use App\Http\Requests\Fumetto\StoreFumettoRequest;
use App\Http\Requests\Fumetto\UpdateFumettoRequest;
use App\Jobs\Fumetto\CreaFumetto;
use App\Models\Fumetto;

class FumettoBisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        CreaFumetto::dispatch();

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFumettoRequest $request)
    {
        //
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fumetto $fumetto)
    {
        //
    }
}

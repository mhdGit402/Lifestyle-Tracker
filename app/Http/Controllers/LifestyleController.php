<?php

namespace App\Http\Controllers;

use App\Models\Lifestyle;
use App\Http\Requests\StoreLifestyleRequest;
use App\Http\Requests\UpdateLifestyleRequest;

class LifestyleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Lifestyle', ['items' => Lifestyle::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Lifestyle/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLifestyleRequest $request)
    {
        Lifestyle::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Lifestyle $lifestyle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lifestyle $lifestyle)
    {
        return inertia("Lifestyle/Edit", ["lifestyle" => $lifestyle]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLifestyleRequest $request, Lifestyle $lifestyle)
    {
        $lifestyle->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lifestyle $lifestyle)
    {
        $lifestyle->delete();
    }
}

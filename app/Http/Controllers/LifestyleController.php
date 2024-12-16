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
        // Create the model instance with the validated data, excluding 'items'
        $lifestyle = Lifestyle::create(array_diff_key($request->validated(), ['items' => null]));

        // Prepare items data for bulk insertion
        $itemsData = collect($request->validated('items'))->map(function ($item) use ($lifestyle) {
            return array_merge($item, ['lifestyle_id' => $lifestyle->id]);
        });

        // Bulk insert items
        $lifestyle->items()->createMany($itemsData);
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

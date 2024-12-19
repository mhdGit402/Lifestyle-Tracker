<?php

namespace App\Http\Controllers;

use App\Models\Tracker;
use App\Http\Requests\StoreTrackerRequest;
use App\Http\Requests\UpdateTrackerRequest;
use App\Models\Lifestyle;

class TrackerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrackerRequest $request)
    {
        // Convert the items array to a JSON string
        $validatedData = $request->validated();
        $validatedData['items'] = json_encode($validatedData['items']);

        // Create a new Tracker record with the validated data
        Tracker::create($validatedData);

        // Retrieve the lifestyle with its relationships
        $lifestyle = Lifestyle::with(['items', 'trackers'])
            ->findOrFail($validatedData['lifestyle_id']);

        return inertia("Lifestyle/View", ["lifestyle" => $lifestyle]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lifestyle $tracker)
    {
        return inertia("Tracker/Create", ["lifestyle" => $tracker->load("items")]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tracker $tracker)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrackerRequest $request, Tracker $tracker)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tracker $tracker)
    {
        Tracker::where("lifestyle_id", $tracker->id)->delete();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Lifestyle;
use App\Http\Requests\StoreLifestyleRequest;
use App\Http\Requests\UpdateLifestyleRequest;
use App\Models\Item;

class LifestyleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Lifestyle', ['items' => Lifestyle::with('items')->get()]);
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
        return inertia("Lifestyle/View", ["lifestyle" => $lifestyle->load(['items', 'trackers'])]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lifestyle $lifestyle)
    {
        return inertia("Lifestyle/Edit", ["lifestyle" => $lifestyle->load('items')]);
    }

    /* Approach 1 */
    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateLifestyleRequest $request, Lifestyle $lifestyle)
    // {
    //     // Update the lifestyle model with validated data, excluding 'items'
    //     $lifestyle->update(array_diff_key($request->validated(), ['items' => null]));

    //     // Prepare items data for bulk insertion
    //     $itemsData = collect($request->validated('items'))->map(function ($item) use ($lifestyle) {
    //         return [
    //             'id' => $item['id'] ?? null,
    //             'title' => $item['title'], // Ensure title is included
    //             'lifestyle_id' => $lifestyle->id,
    //         ];
    //     })->toArray(); // Convert the collection to an array

    //     // Identify which IDs to delete
    //     $existingItemIds = $lifestyle->items()->pluck('id')->toArray();
    //     $newItemIds = array_column($itemsData, 'id');
    //     $idsToDelete = array_diff($existingItemIds, $newItemIds);

    //     // Delete missing records if any
    //     if ($idsToDelete) {
    //         $lifestyle->items()->whereIn('id', $idsToDelete)->delete();
    //     }

    //     // Use upsert to insert or update items
    //     $lifestyle->items()->upsert($itemsData, uniqueBy: ['id'], update: ['title']);
    // }

    /* Approach 2 */
    public function update(UpdateLifestyleRequest $request, Lifestyle $lifestyle)
    {
        // Step 1: Update the lifestyle model with validated data, excluding 'items'
        $this->updateLifestyle($lifestyle, $request->validated());

        // Step 2: Process and sync related items
        $this->syncLifestyleItems($lifestyle, $request->validated('items'));
    }

    /**
     * Update the lifestyle model with validated data.
     *
     * @param Lifestyle $lifestyle
     * @param array $validatedData
     * @return void
     */
    protected function updateLifestyle(Lifestyle $lifestyle, array $validatedData): void
    {
        // Exclude 'items' from the data and update the lifestyle
        $lifestyle->update(array_diff_key($validatedData, ['items' => null]));
    }

    /**
     * Sync the lifestyle's related items with the provided data.
     *
     * @param Lifestyle $lifestyle
     * @param array $items
     * @return void
     */
    protected function syncLifestyleItems(Lifestyle $lifestyle, array $items): void
    {
        // Prepare items data for bulk insertion/updating
        $itemsData = collect($items)->map(function ($item) use ($lifestyle) {
            return [
                'id' => $item['id'] ?? null,
                'title' => $item['title'], // Ensure title is included
                'lifestyle_id' => $lifestyle->id,
            ];
        })->toArray();

        // Identify IDs to delete
        $existingItemIds = $lifestyle->items()->pluck('id')->toArray();
        $newItemIds = array_column($itemsData, 'id');
        $idsToDelete = array_diff($existingItemIds, $newItemIds);

        // Delete missing records
        if (!empty($idsToDelete)) {
            $lifestyle->items()->whereIn('id', $idsToDelete)->delete();
        }

        // Use upsert to insert or update items
        $lifestyle->items()->upsert($itemsData, ['id'], ['title']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lifestyle $lifestyle)
    {
        $lifestyle->delete();
    }
}

<?php

namespace App\Jobs;

use App\Models\Lifestyle;
use App\Models\Streak;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class HandleStreakJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Perform your daily tasks here
        // Log::info('Daily task executed successfully!');

        /* Approach 1 */
        //     $lifestyleWithTrackers = Lifestyle::with('trackers')->withCount('trackers')->get();
        //     foreach ($lifestyleWithTrackers as $lifestyle) {
        //         // Checking if conditions are met in order to qualify for streak which is:
        //         // #1 - There should be at least 3 days worth of trackers for lifestyle
        //         if ($lifestyle->trackers_count >= 3) {
        //             // Decode the JSON data
        //             $trackersCount = $lifestyle->trackers_count;
        //             foreach ($lifestyle->trackers as $tracker) {
        //                 $data = json_decode($tracker->items, true); // Use true to get an associative array

        //                 // Check if all values are true
        //                 $allTrue = true; // Assume all are true initially
        //                 foreach ($data as $object) {
        //                     foreach ($object as $key => $value) {
        //                         if ($value !== true) {
        //                             $allTrue = false; // Set to false if any value is not true
        //                             break; // No need to check further
        //                         }
        //                     }
        //                 }

        //                 // #2 All of items should have true value
        //                 if ($allTrue) {
        //                     Log::info('All items of lifestyle ' . $lifestyle->title . ' are true');
        //                     // #3 Check for streak days
        //                     $achivedStreak = null;
        //                     $defaultStreakDays = [3, 7, 14, 21, 28]; // Current achievable streaks
        //                     if (in_array($trackersCount, $defaultStreakDays)) {
        //                         $achivedStreak = $trackersCount;
        //                     } else {
        //                         // Find the closest number using array_reduce
        //                         $achivedStreak = array_reduce($defaultStreakDays, function ($carry, $item) use ($trackersCount) {
        //                             // If carry is null, initialize it with the first item
        //                             if ($carry === null) {
        //                                 return $item;
        //                             }
        //                             // Return the item with the smallest difference
        //                             return (abs($item - $trackersCount) < abs($carry - $trackersCount)) ? $item : $carry;
        //                         });
        //                     }

        //                     // #4 Save streak based on achivedStreak
        //                     if ($achivedStreak !== null) {
        //                         Streak::create([
        //                             "streak_time" => $achivedStreak . ' days',
        //                             "lifestyle_id" => $lifestyle->id,
        //                             "user_id" => $lifestyle->user_id
        //                         ]);
        //                         Log::info('Streak for lifestyle ' . $lifestyle->title . ' inserted!');
        //                     }
        //                 } else {
        //                     Log::info('There is no streak for lifestyle ' . $lifestyle->title);
        //                 }
        //                 break;
        //             }
        //         }
        //     }
        // }

        /* Approach 2 */
        $lifestyleWithTrackers = Lifestyle::with(['trackers' => function ($query) {
            $query->select('id', 'lifestyle_id', 'items'); // Only fetch necessary columns
        }])->withCount('trackers')->get();

        $defaultStreakDays = [3, 7, 14, 21, 28]; // Current achievable streaks

        foreach ($lifestyleWithTrackers as $lifestyle) {
            // #1 - Check if there are at least 3 trackers
            if ($lifestyle->trackers_count >= 3) {
                $trackersCount = $lifestyle->trackers_count;

                // Process trackers
                foreach ($lifestyle->trackers as $tracker) {
                    $data = json_decode($tracker->items, true); // Decode JSON once

                    // #2 - Check if all values in the JSON are true
                    $allTrue = collect($data)->every(function ($object) {
                        return collect($object)->every(fn($value) => $value === true);
                    });

                    if ($allTrue) {
                        Log::info('All items of lifestyle "' . $lifestyle->title . '" are true');

                        // #3 - Determine the closest streak
                        $achievedStreak = in_array($trackersCount, $defaultStreakDays)
                            ? $trackersCount
                            : collect($defaultStreakDays)->sortBy(fn($day) => abs($day - $trackersCount))->first();

                        // #4 - Save streak if valid
                        if ($achievedStreak !== null) {
                            Streak::create([
                                "streak_time" => $achievedStreak . ' days',
                                "lifestyle_id" => $lifestyle->id,
                                "user_id" => $lifestyle->user_id
                            ]);
                            Log::notice('Streak for lifestyle "' . $lifestyle->title . '" inserted!');
                        }
                    } else {
                        Log::notice('There is no streak for lifestyle "' . $lifestyle->title . '"');
                    }

                    // Break after processing the first tracker
                    break;
                }
            }
        }
    }
}

<?php

namespace App\Policies;

use App\Models\Lifestyle;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LifestylePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Lifestyle $lifestyle): bool
    {
        return $lifestyle->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Lifestyle $lifestyle): bool
    {
        return $lifestyle->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Lifestyle $lifestyle): bool
    {
        return $lifestyle->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Lifestyle $lifestyle): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Lifestyle $lifestyle): bool
    {
        //
    }
}

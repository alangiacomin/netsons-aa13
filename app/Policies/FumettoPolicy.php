<?php

namespace App\Policies;

use App\Models\Fumetto;
use App\Models\User;

class FumettoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Fumetto $fumetto): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Fumetto $fumetto): bool
    {
        return $user->email == 'admin@example.com';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Fumetto $fumetto): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Fumetto $fumetto): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Fumetto $fumetto): bool
    {
        return false;
    }
}

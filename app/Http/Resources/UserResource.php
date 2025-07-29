<?php

namespace App\Http\Resources;

use App\Enums\RoleEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => (int) $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'isSuperAdmin' => $this->hasRole(RoleEnum::SUPER_ADMIN),
            // 'permissions_func' => $this->getAllPermissions(),
            // 'permissions_pluck' => $this->getAllPermissions()
            //    ->filter(fn ($perm) => str_starts_with($perm->name, 'section-')),
            'permissions' => $this->getAllPermissions()
                // ->filter(fn ($perm) => str_starts_with($perm->name, 'section-'))
                ->pluck('name')
                ->toArray(),
        ];
    }
}

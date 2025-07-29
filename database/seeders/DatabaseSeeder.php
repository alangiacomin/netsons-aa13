<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            UsersSeeder::class,
            FumettoSeeder::class,
        ]);

        User::where('email', 'test@example.com')->first()->assignRole(RoleEnum::SUPER_ADMIN);
        User::where('email', 'admin@example.com')->first()->assignRole(RoleEnum::ADMIN);
        User::where('email', 'test@example.com')->first()->assignRole(RoleEnum::EDITOR);
    }
}

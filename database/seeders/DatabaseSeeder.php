<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $adminUser = User::updateOrCreate(
            ['email' => 'admin@example.com'], // email unica
            [
                'name' => 'Admin',
                'password' => Hash::make('password123'), // scegli una password sicura
                // 'is_admin' => true, // se hai questo campo per distinguere admin
            ]
        );

        $testerUser = User::updateOrCreate(
            ['email' => 'test@example.com'], // email unica
            [
                'name' => 'Tester',
                'password' => Hash::make('password123'), // scegli una password sicura
                // 'is_admin' => true, // se hai questo campo per distinguere admin
            ]
        );

        $adminRole = Role::create(['name' => 'admin']);
        Permission::create(['name' => 'edit articles'])->assignRole($adminRole);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::updateOrCreate(
            ['email' => 'admin@example.com'], // email unica
            [
                'name' => 'Admin',
                'password' => Hash::make('password123'), // scegli una password sicura
                // 'is_admin' => true, // se hai questo campo per distinguere admin
            ]
        );

        User::updateOrCreate(
            ['email' => 'test@example.com'], // email unica
            [
                'name' => 'Tester',
                'password' => Hash::make('password123'), // scegli una password sicura
                // 'is_admin' => true, // se hai questo campo per distinguere admin
            ]
        );
    }
}

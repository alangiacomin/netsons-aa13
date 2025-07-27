<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|unique:users,email',
            'name' => 'required|max:255',
        ];
    }

    /**
     * Get custom body parameters description for Scribe.
     *
     * @return array<string, array<string, string>>
     */
    public function bodyParameters(): array
    {
        return [
            'email' => [
                'description' => 'L\'indirizzo email dell\'utente.',
                'example' => 'utente@example.com',
            ],
            'name' => [
                'description' => 'Il nome completo dell\'utente.',
                'example' => 'Mario Rossi',
            ],
        ];
    }
}

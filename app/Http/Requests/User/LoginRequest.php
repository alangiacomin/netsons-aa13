<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Lascia true: il login deve essere accessibile a chiunque.
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'exists:users,email'],
            'password' => ['required', 'string'],
            'remember' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.exists' => 'Non esiste alcun account con questa e-mail.',
        ];
    }
}

<?php

namespace App\Http\Requests\Fumetto;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreFumettiBulkRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'fumetti' => ['required', 'array', 'min:1'],
            'fumetti.*.Titolo' => 'required|max:255',
            'fumetti.*.Numero' => 'required|integer',
            'fumetti.*.DataPubblicazione' => 'date',
            'fumetti.*.DataEsatta' => 'boolean',
        ];
    }
}

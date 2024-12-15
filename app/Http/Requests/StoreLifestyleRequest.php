<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLifestyleRequest extends FormRequest
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
            "title" => ["required", "min:3", "max:255"],
            "start_date" => ["required", "date", "after_or_equal:today"],
            "end_date" => ["required", "date", "after_or_equal:today"],
            "user_id" => ["required", "exists:users,id"],
        ];
    }
}

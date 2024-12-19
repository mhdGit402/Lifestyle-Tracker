<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTrackerRequest extends FormRequest
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
            "submitted_date" => ["required", "date", "after_or_equal:today", Rule::unique('trackers')->where(function ($query) {
                return $query->where('lifestyle_id', $this->lifestyle_id);
            }),],
            "items" => "required|array",
            "lifestyle_id" => "required|exists:lifestyles,id"
        ];
    }
}

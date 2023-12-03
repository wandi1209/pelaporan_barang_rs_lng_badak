import Select from 'react-select';
import { useState, useEffect } from 'react';

export default function SelectAsset({options, value, onChange, label, error}){
    return(
        <div className="mt-4">
            <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Select
                id={label}
                name={label}
                className="mt-1 block w-full"
                options={options}
                value={value}
                onChange={onChange}
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    )
}
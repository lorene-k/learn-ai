"use client";
import { FormControl, FormLabel, FormControlLabel, SelectChangeEvent, RadioGroup, Radio } from '@mui/material';

interface RadioInputProps {
    name: string;
    labels: string[];
    value: string;
    onChange: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

export function RadioInput({ name, value, labels, onChange }: RadioInputProps) {
    const sectionLabel = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <FormControl sx={{ border: 1, borderColor: 'white', borderRadius: 2, p: 2}}>
            <FormLabel id={name}>{sectionLabel}</FormLabel>
            <RadioGroup value={value} name={name} onChange={onChange}>
                {labels.map((label) => (
                    <FormControlLabel
                        key={label}
                        value={label.toLowerCase()}
                        control={<Radio/>}
                        label={label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}
"use client";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SelectInputProps {
    name: string;
    value: string;
    labels: string[];
    onChange: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

export function SelectInput({ name, value, labels, onChange }: SelectInputProps) {
    const sectionLabel = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <FormControl fullWidth>
            <InputLabel id={name}>{sectionLabel}</InputLabel>
            <Select
                labelId={sectionLabel}
                id={name}
                name={name}
                label={sectionLabel}
                onChange={onChange}
                value={value}
                sx={{
                    color: 'white',
                    '.MuiSelect-icon': { color: 'white' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                }}
            >
                {labels.map((label) => (
                    <MenuItem
                        key={label}
                        value={label}
                        sx={{
                            color: 'black',
                            '&.Mui-selected': {
                                color: 'white',
                                backgroundColor: 'primary.main',
                            },
                        }}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl >
    );
}
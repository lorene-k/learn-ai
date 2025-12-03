"use client";
import { LearnForm } from "./components/LearnForm";
import { DropdownMenu } from "./components/DropdownMenu";
import { Box } from '@mui/material';

export default function Home() {
    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #4A00E0 0%, #000000 100%)', }} >
            <DropdownMenu />
            <LearnForm />
        </Box>
    );
}

// Light/dark mode toggle
{/* <Switch {...label} /> */ }
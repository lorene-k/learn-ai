"use client";
import { Box, CircularProgress, Typography } from '@mui/material';

export function Loader({ message }: { message: string }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", mt: 10, height: "100vh", flexDirection: "column", gap: 2 }}>
            <Box>
                <Typography variant="h3" gutterBottom>
                    {message}
                </Typography>
            </Box>
            <CircularProgress />
        </Box>
    );
}
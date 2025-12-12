"use client";
import { Box, Typography } from '@mui/material';

export function LoadingError({ message }: { message: string }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", mt: 10, height: "100vh", flexDirection: "column", gap: 2 }}>
            <Box>
                <Typography variant="h3" sx={{ color: "primary.main" }} gutterBottom>
                    Error: {message}
                </Typography>
            </Box>
        </Box>
    );
}
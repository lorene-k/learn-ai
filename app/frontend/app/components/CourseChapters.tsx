"use client";
import { Box, Typography } from "@mui/material";
import type { Chapter } from "../types/types";

export function CourseChapters({ chapters }: { chapters: Chapter[] }) {
    return (
        <Box sx={{ mb: 4, p: 2 }}>{
            chapters.map((chapter: Chapter) => (
                <Box key={chapter.title} sx={{ mb: 2 }}>
                    <Typography variant="h3" sx={{ mb: 1 }}>{chapter.title}</Typography>
                    <Typography variant="body2" sx={{ mb: 4 }}>{chapter.content}</Typography>
                </Box>
            ))}
        </Box>
    );
}
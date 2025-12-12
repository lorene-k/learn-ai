"use client";
import { Box, Typography } from '@mui/material';
import { useCourseHistory } from '../hooks/useCourseHistory';
import { Loader } from '../components/Loader';
import { CourseHistoryBox } from '../components/CourseHistorybox';
import type { CourseResponse } from '../types/types';

export default function ShowHistory() {
    const { data: courses, isLoading, isError, error } = useCourseHistory();
    if (isLoading) {
        return (
            <Loader message="Loading course history..." />
        );
    }
    if (isError) return <Box>Error: {error.message}</Box>;
    return (
        <Box>
            <Box sx={{ width: "100%", height: '100vh' }}>
                <Typography variant="h2" align="center" sx={{ mb: 4 }}>Course History</Typography>
                <CourseHistoryBox courses={courses as CourseResponse[]} />
            </Box>
        </Box >
    );
}

"use client";
import { Box, Typography } from '@mui/material';
import { useCourseHistory } from '../hooks/useCourseHistory';
import { Loader } from '../components/Loader';
import { EntryButton } from '../components/EntryButton';

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
                <Box sx={{ height: "75vh", width: "100%", overflowY: 'auto' }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800,
                        mx: "auto", px: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: 2,
                        py: 4, mb: 4, alignItems: 'center', justifyContent: 'center', alignItems: "stretch",
                    }}>
                        {courses?.map((course) => (
                            <EntryButton
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                level={course.level}
                                duration={course.duration}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}


// If date needed : 
// const courseDate = new Date(course.created_at);

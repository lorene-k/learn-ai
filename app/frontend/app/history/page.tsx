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
            <Box sx={{ maxWidth: "100%", height: '100vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: 'auto', height: '70vh', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h2" align="center">Course History</Typography>
                    <Box sx={{
                        overflow: 'auto', display: 'flex',
                        flexDirection: 'column', width: '400px', gap: 1, p: 1,
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        msOverflowStyle: "none", scrollbarWidth: "none",
                        boxShadow: `inset 0 4px 6px -4px rgba(0, 0, 0, 0.2), inset 0 -4px 6px -4px rgba(0,0,0,0.2)`,
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

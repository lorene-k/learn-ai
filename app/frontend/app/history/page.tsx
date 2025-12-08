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
            <Box sx={{ maxWidth: 800, mx: "auto", px: 2, height: '100vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px', margin: 'auto',  height: '70vh', }}>
                    <Typography variant="h2" align="center">Course History</Typography>
                    <Box sx={{
                        overflow: 'auto', display: 'flex', borderRadius: 2,
                        flexDirection: 'column', width: '100%', gap: 1, p: 1,
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        msOverflowStyle: "none", scrollbarWidth: "none",
                        boxShadow: "inset 0 4px 6px rgba(0,0,0,0.2)" }}>
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
{/* <li key={course.id}>
    <Button
        component={Link}
        href={`/course/${course.id}`}
        variant="text"
        sx={{
            textTransform: "none",
            color: "inherit",
            "&:hover": { color: "cyan" }
        }}
    >
        {course.title}
    </Button>
</li> */}

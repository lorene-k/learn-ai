"use client";
import { Box, Typography, Link } from '@mui/material';
import { DropdownMenu } from '../components/DropdownMenu';
import { useCourseHistory } from '../hooks/useCourseHistory';
import { Loader } from '../components/Loader';

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
            <Box sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto'}}>
                    <Typography variant="h2">Course History</Typography>
                    <ul>
                        {courses?.map((course) => (
                            <Link
                                key={course.id}
                                href={`/course/${course.id}`}
                                sx={{ textDecoration: 'none', color: 'inherit', hover: { color: 'cyan' } }}>
                                <li key={course.id}>{course.title}</li>
                            </Link>
                        ))}
                    </ul>
                </Box>
            </Box>
        </Box>
    );
}


// If date needed : 
// const courseDate = new Date(course.created_at);
"use client";
import { Box } from '@mui/material';
import { EntryButton } from './EntryButton';
import type { CourseHistory } from '../types/types';


export function CourseHistoryBox({ courses }: { courses: CourseHistory[] }) {
    return (
        <Box sx={{ height: "75vh", width: "100%", overflowY: 'auto' }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800,
                mx: "auto", px: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: 2,
                py: 4, mb: 4, justifyContent: 'center', alignItems: "stretch",
            }}>
                {courses?.slice()
                .reverse()
                .map((course) => (
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
    );
}
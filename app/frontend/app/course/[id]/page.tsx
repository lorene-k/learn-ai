"use client";
import { useRouter, useParams } from "next/navigation";
import { Typography, Box, Stack, IconButton } from "@mui/material";
import type { CourseResponse } from "../../types/types";
import { useCourse } from "../../hooks/useCourse";
import { Loader } from "../../components/Loader"
import { Navbar } from "../../components/Navbar";
import { CourseHeader } from "../../components/CourseHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ShowCourse() {
    const router = useRouter();
    const id = useParams().id as string;
    const { data: course, isLoading, isError, error } = useCourse(id);

    if (isLoading) return <Loader message="Fetching course..." />;
    if (isError || !course)
        return <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>{error?.message}</Typography>;

    const { title, level, duration, description, is_favorite } = course as CourseResponse;

    return (
        <Box>
            <Navbar />
            <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2, mb: 1 }}>
                <IconButton onClick={() => router.back()}>
                    <ArrowBackIcon sx={{ color:"white"}} />
                </IconButton>
            </Box>
            <Box sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
                <Stack spacing={2} sx={{ mb: 3 }}>
                    <CourseHeader level={level} duration={duration} is_favorite={is_favorite} />
                    <Typography variant="h1">{title}</Typography>
                    <Typography variant="body1">{description}</Typography>
                    <Typography variant="h2">Lessons</Typography>
                </Stack>
                {/* <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>{
                    lessons.map((lesson) => (
                        <Box key={lesson.title} sx={{ mb: 2 }}>
                            <Typography variant="h3">{lesson.title}</Typography>
                            <Typography variant="body2" sx={{ mb: 3 }}>{lesson.content}</Typography>
                        </Box>
                    ))}</Box> */}
            </Box>
        </Box>
    );
}

// ADD LESSONS LATER
// Add star icon click event to add course to favs
"use client";
import { useRouter, useParams } from "next/navigation";
import { Typography, Box, Stack, IconButton } from "@mui/material";
import type { CourseResponse, Chapter } from "../../types/types";
import { useCourse } from "../../hooks/useCourse";
import { Loader } from "../../components/Loader"
import { CourseHeader } from "../../components/CourseHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from '@mui/material/Divider';


export default function ShowCourse() {
    const router = useRouter();
    const id = useParams().id as string;
    const { data: course, isLoading, isError, error } = useCourse(id);

    if (isLoading) return <Loader message="Fetching course..." />;
    if (isError || !course)
        return <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>{error?.message}</Typography>;

    const { title, level, duration, description, is_favorite, chapters } = course as CourseResponse;

    console.log("Chapter =", chapters); // ! TEST
    return (
        <Box sx={{ height: "100vh", width: "100%" }}>
            <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2, mb: 1 }}>
                <IconButton onClick={() => router.back()}>
                    <ArrowBackIcon sx={{ color: "white" }} />
                </IconButton>
            </Box>
            <Box sx={{ maxWidth: 800, mx: "auto", px: 2, backgroundColor: "rgba(0, 0, 0, 0.4)", borderRadius: 2, py: 4, mb: 4, overflowY: "auto" }}>
                <Stack spacing={2} sx={{ mb: 3 }}>
                    <CourseHeader level={level} duration={duration} is_favorite={is_favorite} />
                    <Typography variant="h1">{title}</Typography>
                    <Typography variant="body1">{description}</Typography>
                </Stack>

                <Divider variant="middle" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.28)", mb: 10, mt: 10}} />

                <Box sx={{ mb: 4, p: 2 }}>{
                    chapters.map((chapter: Chapter) => (
                        <Box key={chapter.title} sx={{ mb: 2 }}>
                            <Typography variant="h3">{chapter.title}</Typography>
                            <Typography variant="body2" sx={{ mb: 3 }}>{chapter.content}</Typography>
                        </Box>
                    ))}</Box>
            </Box>
        </Box>
    );
}

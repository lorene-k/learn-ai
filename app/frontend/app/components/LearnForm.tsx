"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button, Box, Typography } from '@mui/material';
import { TextInput } from './TextInput';
import { RadioInput } from './RadioInput';
import { SelectInput } from './SelectInput';
import { useGenerateCourse } from '../hooks/useGenerateCourse';
import type { CourseRequest } from "../types/types";
import { Loader } from './Loader';

export function LearnForm() {
    const router = useRouter();
    const [formTopic, setTopic] = useState<string>('');
    const [formDuration, setDuration] = useState<string>('5');
    const [formLevel, setLevel] = useState<string>("beginner");
    const [formError, setFormError] = useState(false);
    const [generateError, setGenerateError] = useState(false);
    const levelLabels = ["Beginner", "Intermediate", "Advanced"];
    const generateCourseMutation = useGenerateCourse();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formEntries = new FormData(e.currentTarget);
        const formData = Object.fromEntries(formEntries);
        const courseRequest: CourseRequest = {
            topic: formData.topic as string,
            level: formData.level as "beginner" | "intermediate" | "advanced",
            duration: parseInt(formData.duration as string),
        };
        if (!formData.topic) {
            setFormError(true);
            return;
        }
        setFormError(false);
        generateCourseMutation.mutate(courseRequest, {
            onSuccess: (data) => {
                setGenerateError(false);
                router.push(`/course/${data.id}`);
            },
            onError: (err) => {
                setGenerateError(true);
                console.error("Error generating course: ", err);

            },
        });
    }

    return (
        <Box>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 1 }}>
                Generate your Course
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px', height: '800px', margin: 'auto', p: 3, borderRadius: 2 }}
            >
                <TextInput name="topic"
                    error={formError}
                    value={formTopic}
                    onChange={(e) => setTopic(e.target.value)}
                    helperText="Please enter a topic."
                />
                <RadioInput name="level"
                    value={formLevel}
                    onChange={(e) => setLevel(e.target.value)}
                    labels={levelLabels} />
                <SelectInput name="duration"
                    value={formDuration}
                    labels={["5", "10", "20", "30"]}
                    onChange={(e) => setDuration(e.target.value)} />
                <Button type="submit" variant="contained" sx={{ fontWeight: '600' }}>Learn now</Button>
            </Box>
            {generateCourseMutation.isPending && (
                <Loader message="Generating your course..." />
            )}
            {generateError && (
                <Typography variant="body2" color="error" sx={{ textAlign: 'center', mt: 5 }}>
                    An error occurred while generating the course. Please try again.
                </Typography>
            )}
        </Box>
    )
}

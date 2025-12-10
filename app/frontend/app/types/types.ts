export interface CourseRequest {
    topic: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: number; // in minutes
}

export interface Chapter {
    title: string;
    content: string;
}

export interface CourseResponse {
    id: number;
    created_at: string;
    title: string;
    level: string;
    duration: string;
    description: string;
    is_favorite: boolean;
    lessons: Chapter[];
}

export interface FormData {
    topic: string;
    level: string;
    duration: string;
}
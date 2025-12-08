"use client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type { CourseResponse } from "../types/types";

export function useCourse(id: string): UseQueryResult<CourseResponse, Error> {
    return useQuery<CourseResponse, Error>({
        queryKey: ["course", id],
        queryFn: async (): Promise<CourseResponse> => {
            const res = await fetch(`/api/course/${id}`);
            if (!res.ok) throw new Error("Failed to fetch course data");
            return res.json();
        }
    });
}
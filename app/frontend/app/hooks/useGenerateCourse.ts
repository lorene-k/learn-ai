"use client";
import { useMutation } from "@tanstack/react-query";
import type { CourseRequest } from "../types/types";

const ENDPOINT = "/api/course/generate";

export function useGenerateCourse() {
    return useMutation<{ id: string }, Error, CourseRequest>({
        mutationFn: async (data: CourseRequest) => {
            try {
                const resp = await fetch(`${ENDPOINT}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                    // credentials: "include"
                });
                if (!resp.ok) throw new Error("Failed to generate course.");
                const ret = await resp.json() as { id: string };
                return ret;
            } catch (err) {
                console.error("Error in useGenerateCourse:", err);
                throw err;
            }
        },
    });
}

"use client";
import { Button, Typography, Box } from "@mui/material";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useRouter } from "next/navigation";

interface EntryButtonProps {
    id: number;
    title: string;
    level: string;
    duration: string;
}

export function EntryButton({ id, title, level, duration }: EntryButtonProps) {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.push(`/course/${id}`)}
            variant="text"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textTransform: "none",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                textDecoration: "none",
                "&:hover": {
                    color: "white",
                    borderColor: "primary.main",
                },
                p: 1,
            }}
        >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <SignalCellularAltIcon sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }} />
                <Typography variant="body2">{level}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <TimerOutlinedIcon sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }} />
                <Typography variant="body2">{duration} min</Typography>
            </Box>
        </Button>
    );
}

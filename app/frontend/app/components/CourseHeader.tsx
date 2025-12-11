"use client";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Typography } from "@mui/material";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

interface CourseHeaderProps {
    level: string;
    duration: string;
    is_favorite: boolean;
}

export function CourseHeader({ level, duration, is_favorite }: CourseHeaderProps) {
    return (
        <Box sx={{ backgroundColor: "rgb(0, 0, 0, 0.2)", display: "flex", p: 2, borderRadius: 1, justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap:1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <SignalCellularAltIcon sx={{ fontSize: 20, verticalAlign: "middle", mr: 0.5 }}/>
                                <Typography variant="body2">Level: {level}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <TimerOutlinedIcon sx={{ fontSize: 20, verticalAlign: "middle", mr: 0.5 }} />
                                <Typography variant="body2"> Duration: {duration} minutes</Typography>
                            </Box>
                        </Box>
                        {is_favorite ? <StarIcon sx={{ color: "primary.main", fontSize: 30 }} /> :
                            <StarBorderIcon sx={{ color: "gray", fontSize: 30 }} />}
                    </Box>
    );
}
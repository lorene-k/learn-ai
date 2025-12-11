"use client";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton } from "@mui/material";

export function FavButton({ isFavorite }: { isFavorite: boolean }) {
    const updateFavStatus = () => {
        if (isFavorite) {

        } else {

        }
    };

    return (
        <IconButton id="fav-button" onClick={updateFavStatus}>
            {isFavorite ? <StarIcon sx={{ color: "gold", fontSize: 30 }} /> :
                <StarBorderIcon sx={{ color: "gray", fontSize: 30 }} />}
        </IconButton >
    );
}
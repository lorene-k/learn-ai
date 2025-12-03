"use client";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { useRouter } from 'next/navigation';

export function DropdownMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (action: string) => {
        setAnchorEl(null);
        switch (action) {
            case "home":
                router.push("/");
                break;
            case "history":
                router.push("/history");
                break;
            case "favorites":
                console.log("Favorites clicked.");
                break;
        }
    };

    return (
        <div>
            <IconButton
                id="dropdown-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuClick}
                sx={{ m: 4, color: 'white' }}
            >
            <MenuSharpIcon></MenuSharpIcon>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{ list: { 'aria-labelledby': 'basic-button', }, }}
                sx={{
                    '& .MuiMenuItem-root': {
                        color: 'black', '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                        },
                    },
                    fontWeight: 'medium',
                }}
            >
            <MenuItem onClick={() => handleItemClick("home")}>Home</MenuItem>
            <MenuItem onClick={() => handleItemClick("history")}>History</MenuItem>
            <MenuItem onClick={() => handleItemClick("favorites")}>Favorites</MenuItem>
        </Menu>
        </div >
    );
}
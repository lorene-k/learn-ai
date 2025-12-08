import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { DropdownMenu } from "./DropdownMenu";

export function Navbar() {
    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 7px 29px 0px'}}>
                <Toolbar>
                    <DropdownMenu />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', ml: 4 }}>
                        Learn.ai
                    </Typography>
                    <Button sx={{ color: 'white' }}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
} 
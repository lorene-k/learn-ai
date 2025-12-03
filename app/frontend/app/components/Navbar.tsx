import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { DropdownMenu } from "./DropdownMenu";

export function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
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
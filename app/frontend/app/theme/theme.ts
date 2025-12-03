import { createTheme } from '@mui/material/styles';

const typography = {
    fontFamily: '"Outfit", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 700, color: '#FFFFFF' },
    h2: { fontSize: '2rem', fontWeight: 600, color: '#FFFFFF' },
    h3: { fontSize: '1rem', fontWeight: 600, color: '#FFFFFF' },
    body1: { fontSize: '1rem', fontWeight: 400, color: '#FFFFFF' },
    body2: { fontSize: '0.875rem', fontWeight: 400, color: '#FFFFFF' },
}

export const theme = createTheme({
    typography: typography,
    palette: {
        background: {
            default: '#4A00E0', // #4A00E0
        },
        primary: {
            main: '#FF6F61', // #FF6F61
        },
        secondary: {
            main: '#FFD700', // #8E2DE2
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#E0E0E0', // #E0E0E0
        },
    },
});
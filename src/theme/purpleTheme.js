import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#036298',
            shades: [
                '#FCD5E1',
                '#F7A8C0',
                '#E65C86',
                '#CD3966'
            ]
        },
        secondary: {
            main: '#9C76CE',
            shades: [
                '#E3D4F7',
                '#BFA2E5',
                '#7B51B3',
                '#61359C'
            ]
        },
        tertiary: {
            main: '#FFF488',
            shades: [
                '#FFFBD7',
                '#FFF8AE',
                '#FFF166',
                '#E6D740'
            ]
        },
        quaternary: {
            main: '#B1EE7F',
            shades: [
                '#E7FCD5',
                '#CBF6A8',
                '#9AE55C',
                '#7CCD39'
            ]
        },
        success: {
            main: '#B1EE7F',
        },
        error: {
            main: red.A400
        }
    }
})
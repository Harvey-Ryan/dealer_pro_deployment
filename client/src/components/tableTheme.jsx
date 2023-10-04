
import { createTheme } from 'react-data-table-component';

createTheme(
    'custom',
    {
        text: {
            primary: '#000', // Text color for light mode
            secondary: '#000', // Text color for dark mode
        },
        background: {
            default: '#E5E8E8', // Background color for light mode
            secondary: '#000', // Background color for dark mode
        },
        context: {
            background: '#007BFF', // Context (highlight) color for both modes
            text: '#fff', // Text color for context in both modes
        },
        divider: {
            default: '#fff', // Divider color for both modes
        },
        button: {
            default: '#007BFF', // Button color for both modes
            // hover: 'rgba(0, 123, 255, 0.8)', // Button hover color for both modes
            // focus: 'rgba(0, 123, 255, 0.5)', // Button focus color for both modes
            // disabled: 'rgba(0, 0, 0, 0.34)', // Button disabled color for both modes
        },
        striped: {
            default: '#EAEDED', // Background color for striped rows in both modes
        },
    },
    'dark'
);

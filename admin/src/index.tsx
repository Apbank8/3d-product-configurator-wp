import React from 'react';
import { createRoot } from 'react-dom/client';
import { ProductConfigurator } from './components/ProductConfigurator';

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <ProductConfigurator />
            </React.StrictMode>
        );
    }
});

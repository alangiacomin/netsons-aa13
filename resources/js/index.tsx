import {createRoot, Root} from 'react-dom/client';
import App from "./App.tsx";
import './bootstrap';


const container: HTMLElement | null = document.getElementById('app');

if (!container) {
    throw new Error('Failed to find the root element');
}

const root: Root = createRoot(container);
root.render(<App/>);

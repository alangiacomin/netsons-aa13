import {createRoot, Root} from 'react-dom/client';
// import Bootstrap from "./Bootstrap";
import App from "./App.tsx";

const container: HTMLElement | null = document.getElementById('app');

if (!container) {
    throw new Error('Failed to find the root element');
}

const root: Root = createRoot(container);
root.render(<App/>);

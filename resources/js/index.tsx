import {createRoot, Root} from 'react-dom/client';
// import Bootstrap from "./Bootstrap";

const container: HTMLElement | null = document.getElementById('app');

if (!container) {
    throw new Error('Failed to find the root element');
}

const root: Root = createRoot(container);
root.render(<h1>React funziona!</h1>);

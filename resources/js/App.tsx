import MainProvider from "./MainProvider.tsx";
import Router from "./Router.tsx";

const App = () => (
    <MainProvider>
        <Router/>
    </MainProvider>
);

export default App;

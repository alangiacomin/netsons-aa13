import MainProvider from "./MainProvider.tsx";
import Router from "./Router.tsx";
import DebugData from "./areas/app/DebugData.tsx";

const App = () => (
    <MainProvider>
        <Router/>
        <DebugData/>
    </MainProvider>
);

export default App;

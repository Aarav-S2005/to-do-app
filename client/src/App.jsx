import "./styles/index.css"
import {AuthProvider} from "./hooks/useAuth.jsx";
import RoutePages from "./Routes.jsx";

function App() {

    return (
        <>
            <div className={"absolute w-full min-h-screen bg-[url('../assets/img/abstractIMG.png')] bg-cover bg-center bg-no-repeat "}>

            </div>
            <AuthProvider>
                <RoutePages />
            </AuthProvider>
        </>

    )
}

export default App

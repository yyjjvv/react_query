import { useState } from "react";
import { Outlet } from "react-router-dom";

import { LoginContext } from "../context/LoginContext";
import styles from "./App.module.css";
import "./App.font.css";

import Navigation from "./Navigation";

function App() {
    const [currentUsername, setCurrentUsername] = useState();

    return (
        <LoginContext.Provider value={{ currentUsername, setCurrentUsername }}>
            <Navigation className={styles.nav} />
            <div className={styles.body}>
                <Outlet />
            </div>
        </LoginContext.Provider>
    );
}

export default App;

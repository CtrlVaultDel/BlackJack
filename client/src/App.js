import React from "react";

// Components
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

// Context
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
// =========================== IMPORTS END ===========================


function App() {
    return (
        <Router>
            <UserProfileProvider>
                <Header />
                <ApplicationViews />                   
            </UserProfileProvider>
        </Router>
    );
};

export default App;
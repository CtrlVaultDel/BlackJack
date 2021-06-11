// React
import React from "react";

// React Router DOM
import { BrowserRouter as Router } from "react-router-dom";

// Components
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

// Context
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
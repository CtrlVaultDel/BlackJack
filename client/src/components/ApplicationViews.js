// React
import React, { useContext } from "react";

// React Router DOM
import { Switch, Route, Redirect } from "react-router-dom";

// Context
import { UserProfileContext } from "../providers/UserProfileProvider";

// Components
import Login from "./Login";
import Register from "./Register";
import Game from "./blackJackGame/Game";
// =========================== IMPORTS END ===========================


const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                {/* -----------------LOGIN & REGISTRATION PAGES---------------- */}
                <Route path="/" exact>
                    {isLoggedIn ? <Redirect to="/"/> : <Redirect to="/login" />}
                </Route>

                {/* Login Page */}
                <Route path="/login">
                    <Login />
                </Route>

                {/* Registration Page */}
                <Route path="/register">
                    <Register />
                </Route>

                {/* ----------------------- GAME ----------------------- */}
                <Route path="/play">
                    <Game />
                </Route>

            </Switch>
        </main>
    );
};

export default ApplicationViews;
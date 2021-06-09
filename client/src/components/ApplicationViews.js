import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Game from "./blackJackGame/Game";

// Game Components

export default function ApplicationViews () {
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
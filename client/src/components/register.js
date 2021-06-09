import React, { useState, useContext } from "react";
import { Button, Container, Card, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";

// Context
import { UserProfileContext } from "../providers/UserProfileProvider";
// =========================== IMPORTS END ===========================


export default function Register () {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match.");
        } else {
            const user = { email, username };
            register(user, password)
            .then(() => history.push("/"));
        }
    };

    return (
        <Container style={{width: "300px"}} className="text-center ">
            <Card>
                <Form onSubmit={registerClick}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" onChange={e => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button>Register</Button>
                    </FormGroup>
                </Form>
            </Card>
        </Container>
    );
}
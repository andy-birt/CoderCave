import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../managers/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      register(email, password)
        .then(() => navigate("/"));
    }
  };

  return (
    <Container>
      <Form onSubmit={registerClick}>
        <fieldset>
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
          <em>
            Already registered? <Link to="/login">Login</Link>
          </em>
        </fieldset>
      </Form>
    </Container>
  );
}
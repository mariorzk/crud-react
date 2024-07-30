import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Grid from "./components/Grid";
import axios from "axios";
import { User } from "./components/Types";
import { ToastContainer, toast } from "react-toastify";
import Container from "./components/Container";
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [onEdit, setOnEdit] = useState<User | null>(null);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8800/");
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Form setUsers={setUsers} setOnEdit={setOnEdit} onEdit={onEdit} getUsers={getUsers} />
        <Grid users={users} setOnEdit={setOnEdit} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </div>
  );
}

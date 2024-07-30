import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../components/Types";

interface FormProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setOnEdit: React.Dispatch<React.SetStateAction<User | null>>;
  onEdit: User | null;
  getUsers: () => void;
}

const Form: React.FC<FormProps> = ({ setUsers, setOnEdit, onEdit, getUsers }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [nascimento, setNascimento] = useState("");

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const foneRef = useRef<HTMLInputElement>(null);
  const nascimentoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onEdit) {
      setNome(onEdit.nome);
      setEmail(onEdit.email);
      setFone(onEdit.fone);
      setNascimento(onEdit.nascimento);
    }
  }, [onEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nomeRef.current?.value ||
      !emailRef.current?.value ||
      !foneRef.current?.value ||
      !nascimentoRef.current?.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const user = {
      nome: nomeRef.current.value,
      email: emailRef.current.value,
      fone: foneRef.current.value,
      nascimento: nascimentoRef.current.value,
    };

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, user);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800", user);
        toast.success("Usuário criado com sucesso!");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }

    setNome("");
    setEmail("");
    setFone("");
    setNascimento("");

    setOnEdit(null);
    getUsers();
  };

  return (
    <div className="container mx-auto mt-10 max-w-4xl p-6 bg-slate-100 rounded-lg shadow-md mb-10">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 lg:w-1/5 px-3 mb-4 md:mb-0">
            <label htmlFor="name" className="block text-gray-700 mb-2">Nome:</label>
            <input
              type="text"
              id="name"
              ref={nomeRef}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-3 mb-4 md:mb-0">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-3 mb-4 md:mb-0">
            <label htmlFor="phone" className="block text-gray-700 mb-2">Telefone:</label>
            <input
              type="tel"
              id="phone"
              ref={foneRef}
              value={fone}
              onChange={(e) => setFone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-3 mb-4 md:mb-0">
            <label htmlFor="birthdate" className="block text-gray-700 mb-2">Nascimento:</label>
            <input
              type="date"
              id="birthdate"
              ref={nascimentoRef}
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
              className=" px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-3 mb-4 md:mb-1 flex items-end">
            <button type="submit" className="w-3/4 bg-blue-500 text-white py-2 px-4 rounded-md ml-8 hover:bg-blue-600">
              {onEdit ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

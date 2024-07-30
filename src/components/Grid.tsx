import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
interface User {
  id: number;
  nome: string;
  email: string;
  fone: string;
  nascimento: string;
}

interface GridProps {
  users: User[];
  setUsers: (User: any) => void;
  setOnEdit: (User: any) => void;
}

const Grid = ({ users, setUsers, setOnEdit }: GridProps) => {
  const handleEdit = (item: User) => {
    setOnEdit(item);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8800/${id}`);
      const newArray = users.filter((user) => user.id !== id);

      setUsers(newArray);
      toast.success(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || "Ocorreu um erro");
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold ">
        Usuários Cadastrados
      </h1>
      <table className="w-full bg-white p-5 rounded mx-auto my-5 break-words">
        <thead>
          <tr>
            <th className="text-left border-b pb-2">Nome</th>
            <th className="text-left border-b pb-2">Email</th>
            <th className="text-left border-b pb-2">Fone</th>
            <th className="text-left border-b pb-2">Nascimento</th>
            <th className="border-b pb-2"></th>
            <th className="border-b pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <tr key={i}>
              <td className="py-3 w-auto">{item.nome}</td>
              <td className="py-3 w-auto">{item.email}</td>
              <td className="py-3 w-auto hidden md:table-cell truncate">
                {item.fone}
              </td>
              <td className="py-3 w-auto md:table-cell truncate">
                {item.nascimento}
              </td>
              <td className="py-3 w-auto text-center">
                <div className="cursor-pointer inline-block">
                  <FaEdit onClick={() => handleEdit(item)} />
                </div>
              </td>
              <td className="py-3 w-1/12 text-center">
                <div className="cursor-pointer inline-block">
                  <FaTrash onClick={() => handleDelete(item.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;

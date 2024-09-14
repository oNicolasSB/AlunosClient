import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login/Index";
import Alunos from "./Pages/Alunos/Index";
import NovoAluno from "./Pages/NovoAluno/Index";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/alunos" element={<Alunos />} />
                <Route path="/aluno/novo/:alunoId" element={<NovoAluno />} />
            </Routes>
        </BrowserRouter>
    );
}

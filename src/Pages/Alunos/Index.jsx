import './Index.css';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logoCadastro from '../../assets/clipboard.svg'
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';

export default function Alunos() {
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);
    const history = useNavigate();

    const [nome, setNome] = useState('');
    const [alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const searchAlunos = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const dadosFiltrados = alunos.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        }
        else {
            setFiltro(alunos);
        }
    }

    useEffect(() => {
        api.get('/api/alunos', authorization).then(response => { setAlunos(response.data), token });
    }, []);

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            history('/');
        }
        catch (error) {
            alert('Erro no logout.');
        }
    }

    async function editAluno(id) {
        try {
            history(`/aluno/novo/${id}`);
        }
        catch (error) {
            alert('Erro ao editar o aluno.');
        }
    }

    async function deleteAluno(id) {
        try {
            if (window.confirm("Deseja excluir o aluno de id: " + id + " ?")) {
                await api.delete(`api/alunos/${id}`, authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            }
        }
        catch (error) {
            alert('Erro ao excluir o aluno.');
        }
    }


    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem vindo, <strong>{email}</strong>!</span>
                <Link className='button' to='/aluno/novo/0'>Novo aluno</Link>
                <button type='button' onClick={logout}>
                    <FiXCircle size={35} color='#17202A' />
                </button>
            </header>
            <form>
                <input type="text" placeholder='filtrar por nome...' value={searchInput} onChange={(e) => searchAlunos(e.target.value)} className='search' />
            </form>
            <h1>Relação de alunos</h1>
            {
                searchInput.length > 0
                    ?
                    <ul>
                        {filtro.map(aluno => (
                            <li key={aluno.id}>
                                <b>Nome: </b>{aluno.nome}<br /><br />
                                <b>Email: </b>{aluno.email}<br /><br />
                                <b>Idade: </b>{aluno.idade}<br /><br />
                                <button type="button" onClick={() => editAluno(aluno.id)}>
                                    <FiEdit size={25} color="#17202a" />
                                </button>
                                <button type="button" onClick={() => deleteAluno(aluno.id)}>
                                    <FiUserX size={25} color="#17202a" />
                                </button>
                            </li>
                        ))}
                    </ul> :
                    <ul>
                        {alunos.map(aluno => (
                            <li key={aluno.id}>
                                <b>Nome: </b>{aluno.nome}<br /><br />
                                <b>Email: </b>{aluno.email}<br /><br />
                                <b>Idade: </b>{aluno.idade}<br /><br />
                                <button type="button" onClick={() => editAluno(aluno.id)}>
                                    <FiEdit size={25} color="#17202a" />
                                </button>
                                <button type="button" onClick={() => deleteAluno(aluno.id)}>
                                    <FiUserX size={25} color="#17202a" />
                                </button>
                            </li>
                        ))}
                    </ul>
            }
        </div>
    )
}
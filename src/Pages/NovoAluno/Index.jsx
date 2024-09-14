import api from '../../services/api';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import './Index.css';

export default function NovoAluno() {
    const { alunoId } = useParams();
    const history = useNavigate();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState(0);
    const [email, setEmail] = useState('');

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if (alunoId !== '0')
            loadAluno();
    }, [alunoId]);

    async function loadAluno() {
        try {
            const response = await api.get(`api/alunos/${alunoId}`, authorization);

            setId(response.data.id);
            setNome(response.data.nome);
            setIdade(response.data.idade);
            setEmail(response.data.email);
        }
        catch (error) {
            alert('Erro ao carregar o aluno' + error);
            history('/alunos');
        }
    }

    async function saveOrUpdate(e) {
        e.preventDefault();
        const data = {
            nome, email, idade
        }

        try {
            if (alunoId === '0') {
                await api.post('api/alunos', data, authorization);
            } else {
                data.id = alunoId;
                await api.put(`api/alunos/${alunoId}`, data, authorization);
            }
        }
        catch (error) {
            alert('Erro ao salvar o aluno' + error);
        }

        history('/alunos');
    }


    return (
        <div className="novo-aluno-container">
            <div className="content">
                <section className='form'>
                    <FiUserPlus size={105} color='#17202A' />
                    <h1>{alunoId === '0' ? "Incluir novo aluno" : "Atualizar aluno"}</h1>
                    <Link className="back-link" to="/alunos" >
                        <FiCornerDownLeft size={25} color="#17202A" />
                        <span>Voltar</span>
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    <input type="text" placeholder="Idade" value={idade} onChange={e => setIdade(e.target.value)} />
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}
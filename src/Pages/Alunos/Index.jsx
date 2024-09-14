import './Index.css';
import { Link } from "react-router-dom";
import logoCadastro from '../../assets/clipboard.svg'
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';

export default function Alunos() {
    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem vindo, <strong>Usuário</strong>!</span>
                <Link className='button' to='/aluno/novo/0'>Novo aluno</Link>
                <button type='button'>
                    <FiXCircle size={35} color='#17202A' />
                </button>
            </header>
            <form>
                <input type="text" placeholder='nome' />
                <button type='button' className='button'>Filtrar aluno por nome (parcial)</button>
            </form>
            <h1>Relação de alunos</h1>
            <ul>
                <li>
                    <b>Nome: </b>Paulo<br /><br />
                    <b>Email: </b>paulo@email.com<br /><br />
                    <b>Idade: </b>22<br /><br />
                    <button type="button">
                        <FiEdit size={25} color="#17202a" />
                    </button>
                    <button type="button">
                        <FiUserX size={25} color="#17202a" />
                    </button>
                </li>
            </ul>
        </div>
    )
}
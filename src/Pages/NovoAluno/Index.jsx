import { Link, useParams } from "react-router-dom";
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import './Index.css';

export default function NovoAluno() {

    const { alunoId } = useParams();

    return (
        <div className="novo-aluno-container">
            <div className="content">
                <section className='form'>
                    <FiUserPlus size={105} color='#17202A' />
                    <h1>{alunoId === '0'? "Incluir novo aluno" : "Atualizar aluno"}</h1>
                    <Link className="back-link" to="/alunos" >
                        <FiCornerDownLeft size={25} color="#17202A" />
                        <span>Voltar</span>
                    </Link>
                </section>
                <form >
                    <input type="text" placeholder="Nome" />
                    <input type="text" placeholder="Idade" />
                    <input type="text" placeholder="Email" />
                    <button className="button" type="submit">Texto</button>
                </form>
            </div>
        </div>
    )
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';
import loginPlaceholder from '../../assets/login-placeholder.png';
import api from '../../services/api';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    async function login(e) {
        e.preventDefault();
        const data = { email, password }

        try {
            const response = await api.post('/api/account/loginUser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            history('/alunos');

        } catch (error) {
            alert('Erro no login, verifique suas credenciais!');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={loginPlaceholder} alt="login placeholder image" />
                <form onSubmit={login}>
                    <h1>Login</h1>
                    <input type="email" placeholder='Email' name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='Senha' name="senha" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type='submit' className='button'>Login</button>
                </form>
            </section>
        </div>
    );
}
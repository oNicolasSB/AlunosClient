import './Index.css';
import loginPlaceholder from '../../assets/login-placeholder.png';

export default function Login() {
    return (
        <div className="login-container">
            <section className="form">
                <img src={loginPlaceholder} alt="login placeholder image" />
                <form >
                    <h1>Login</h1>
                    <input type="email" placeholder='Email' name="email" />
                    <input type="password" placeholder='Senha' name="senha" />
                    <button type='submit' className='button'>Login</button>
                </form>
            </section>
        </div>
    );
}
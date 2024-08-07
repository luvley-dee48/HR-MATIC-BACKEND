import{ useState } from 'react';
import logo2 from '../assets/images/Logo.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'; 

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validEmail = 'admin@example.com'; 
  const validPassword = 'password123'; 
  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === validEmail && password === validPassword) {
      onLogin(); 
      navigate('/dashboard'); 
    } else {
      alert('Invalid email or password!'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-50">
      <div className="login-container bg-white p-12 rounded-lg shadow-lg w-96 relative">
        <img src={logo2} alt="Logo" className="mx-auto mb-4 w-20 h-20" />
        <h2 className="text-2xl font-bold mb-8 text-center mt-4">SIGN IN TO YOUR ACCOUNT</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative"> 
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-mediumpurple-100 focus:border-mediumpurple-100 sm:text-sm input-grey"
              placeholder="email"
            />
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mediumpurple-200" /> 
          </div>
          <div className="relative"> 
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-mediumpurple-100 focus:border-mediumpurple-100 sm:text-sm input-grey"
              placeholder="password"
            />
            <FontAwesomeIcon icon={faKey} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mediumpurple-200" /> 
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mediumpurple-100-90 hover:bg-mediumpurple-100-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediumpurple-100"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


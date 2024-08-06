// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Add authentication logic here
//     // On successful login, navigate to the dashboard
//     navigate('/dashboard');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
//         <h2 className="text-2xl mb-4">Login</h2>
//         <div className="mb-4">
//           <label className="block text-sm mb-2">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm mb-2">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import logo from '../assets/images/Logo.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validEmail = 'admin@example.com'; // hardcoded email
  const validPassword = 'password123'; // hardcoded password

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if email and password match the hardcoded values
    if (email === validEmail && password === validPassword) {
      onLogin(); // Call the login handler
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      alert('Invalid email or password!'); // Show an error alert
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-50">
      <div className="login-container bg-white p-12 rounded-lg shadow-lg w-96 relative">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-20 h-20" />
        <h2 className="text-2xl font-bold mb-8 text-center mt-4">SIGN IN TO YOUR ACCOUNT</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm input-grey"
              placeholder="email"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm input-grey"
              placeholder="password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

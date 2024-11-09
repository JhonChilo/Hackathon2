import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Si usas React Router para redirección

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Estado para manejar el formulario de registro
  const [email, setEmail] = useState(''); // Agregar estado para el email en el formulario de registro
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita la recarga de la página
    try {
      const response = await fetch('https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacena el token en el localStorage para persistencia de sesión
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        // Redirigir a otra página después del login
        navigate('/dashboard'); // Cambia '/dashboard' a la ruta que necesites
      } else {
        console.error('Login failed:', data.message);
        alert('Error en las credenciales');
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      alert("Hubo un error en la conexión al servidor");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita la recarga de la página
    try {
      const response = await fetch('https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, role: 'client' }), // Agregar email en el registro
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario creado exitosamente');
        setUsername('');
        setPassword('');
        setEmail('');
        setIsRegistering(false); // Después de registrar, ocultar el formulario de registro
      } else {
        console.error('Registration failed:', data.message);
        alert('Error al crear el usuario');
      }
    } catch (error) {
      console.error("Error al intentar crear cuenta:", error);
      alert("Hubo un error en la conexión al servidor");
    }
  };

  const handleLogout = () => {
    // Elimina el token para cerrar sesión
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Redirigir al inicio después de cerrar sesión
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isLoggedIn ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-500">¡Bienvenido, {username}!</h1>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                placeholder="Ingresa tu nombre de usuario"
                required
              />
            </div>
            {isRegistering && (
              <div className="mb-4">
                <label className="block text-gray-700">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
              </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {isRegistering ? 'Registrar cuenta' : 'Iniciar sesión'}
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                {isRegistering ? 'Ya tengo una cuenta' : 'Crear cuenta'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

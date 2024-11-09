// src/services/authService.ts

const API_URL = 'http://localhost:5173';  // Cambia esta URL por la de tu API real

async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Error en el inicio de sesión');
  }
  return await response.json();
}

async function register(username: string, password: string, role: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, role }),
  });
  if (!response.ok) {
    throw new Error('Error en el registro');
  }
  return await response.json();
}

export default { login, register };

import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAction = async (endpoint) => {
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.detail || 'error');
      }
      setMessage(endpoint.includes('login') ? 'Logged in!' : 'Registered!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login or Register</h1>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-2 mb-2">
        <button className="px-3 py-1 bg-blue-500 text-white" onClick={() => handleAction('/register')}>
          Register
        </button>
        <button className="px-3 py-1 bg-green-500 text-white" onClick={() => handleAction('/login')}>
          Login
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

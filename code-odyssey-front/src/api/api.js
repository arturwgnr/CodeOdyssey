const API_URL = "http://localhost:3000";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return data;
}

export async function register(name, username, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, email, password }),
  });

  const data = await res.json();

  return data;
}

export async function getPrivate(token) {
  const res = await fetch(`${API_URL}/private`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
}

export async function logout(refreshToken) {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  return data;
}

export async function refreshSession(refreshToken) {
  const res = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refreshToken),
  });

  const data = await res.json();

  return data;
}

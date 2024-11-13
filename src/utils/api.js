const API_URL = 'http://localhost:8080';

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
}

async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);
  return handleResponse(response);
}

async function postData(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

async function putData(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

async function deleteData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export { fetchData, postData, putData, deleteData };

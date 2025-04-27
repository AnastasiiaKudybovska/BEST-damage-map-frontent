export const makeRequest = async (url, method, body) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    
    if (method === 'OPTIONS' && response.status === 403) {
      return { ok: true };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (errorData?.detail?.includes("Access denied. Only for Ukrainian IP.")) {
        window.location.href = '/access-denied';
        return { ok: false, redirected: true };
      }
      throw new Error(errorData?.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
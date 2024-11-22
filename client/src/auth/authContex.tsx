import { refreshToken } from './api';

export const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    // Decode the token payload
    const payload = token.split('.')[1];
    if (!payload) throw new Error('Invalid token format');

    const decodedPayload = JSON.parse(atob(payload)) as { exp: number };
    const currentTime = Date.now() / 1000;

    console.log('Token expiration time:', decodedPayload.exp, 'Current time:', currentTime);

    // Check if the token is still valid
    if (decodedPayload.exp > currentTime) return true;

    // If expired, refresh the token
    console.log('Access token expired. Attempting refresh...');
    await refreshToken(); // Ensure `refreshToken` returns a new access token
    return true;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
};

export async function refreshAccessToken() {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include", // Ensures cookies are sent
    });
    const data = await response.json();

    if (response.ok) {
      // Use the new access token for further API requests
      return data.accessToken;
    } else {
      // Handle errors, possibly by forcing the user to log in again
      console.error("Failed to refresh access token:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

import AuthService from "./auth.service";
export default function authHeader() {
    const collaborateur = AuthService.getCurrentUser
    if (collaborateur && collaborateur.accessToken) {
      return { Authorization: `Bearer ${currentUser.token}` };     
    } else {
      return {};
    }
  }
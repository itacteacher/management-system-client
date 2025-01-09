import { jwtDecode } from 'jwt-decode';

export class JwtHelper {
  static decodeToken(token: string): any {
    return jwtDecode(token);
  }

  static getUserIdFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }
}

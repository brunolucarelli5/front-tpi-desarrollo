import { Injectable } from "@angular/core";
import { LoginI, RegisterI, TokenI } from "./interfaces/token";
import { HttpErrorResponse } from "@angular/common/http";
import { timer } from "rxjs";
import { IUser } from "./interfaces/user";

import moment from "moment";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = "http://localhost:3000";

  constructor() {}

  async login(body: LoginI): Promise<TokenI> {
    try {
      console.log(body);
      console.log("Se intenta iniciar sesion");
      const response = (await axios.post(`${this.url}/users/login`, body)).data;
      console.log(response);
      localStorage.setItem("token", JSON.stringify(response));
      const time = moment(response.expirationTime).diff(moment());
      console.log("El tiempo que se recibe es: ", time / 60)
      timer(time * 0.5).subscribe(async () => {
        await this.refreshToken();
      });
      return response;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }

  async register(body: RegisterI): Promise<void> {
    let email = body.email;
    try {
      console.log('Ingresó al try')
      await axios.post(`${this.url}/users/register`, body);
      console.log("Se intenta registrar")
      await axios.post(`${this.url}/users/${email}/permissions/1`);
      await axios.post(`${this.url}/users/${email}/permissions/2`);
      await axios.post(`${this.url}/users/${email}/permissions/5`);
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      await axios.post(`${this.url}/jwt/verifyToken`, { token });
      return true;
    } catch (error) {
      return false;
    }
  }

  async refreshToken() {
    const tokenObject: {
      refreshToken: string;
      accessToken: string;
      expirationTime: Date | string;
    } = JSON.parse(localStorage.getItem("token") ?? "{refreshToken:''}");

    console.log("El access token que envio es: ", tokenObject.accessToken)
    console.log("El refresh token que envio es: ", tokenObject.refreshToken)
    console.log("El expiration time que envio es: ", tokenObject.expirationTime)

    const response = (
      await axios.get(`${this.url}/users/refresh-token`, {
        headers: {
          "refresh-token": tokenObject.refreshToken,
        },
      })
    ).data;
    console.log("El token que se recibe desde el método refreshToken es: ", response);
    tokenObject.accessToken = response.accessToken;
    tokenObject.refreshToken =
      response?.refreshToken ?? tokenObject.refreshToken;
    tokenObject.expirationTime = response.expirationTime;
    localStorage.setItem("token", JSON.stringify(tokenObject));
  }

  async findAllEmails(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.url}/users/emails`);
      return response.data;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }

  async isEmailTaken(email: string): Promise<boolean> {
    try {
      const response = await axios.get(`${this.url}/users/email/${email}`);
      return response.data;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }

  async getUserFromToken(): Promise<{firstName: string; lastName: string}> {
    const tokenString = localStorage.getItem("token");
    const tokenObj = tokenString ? JSON.parse(tokenString) : null;
    const accessToken = tokenObj ? tokenObj.accessToken : null;
    if (accessToken) {
      try {
        const decoded: any = jwtDecode(accessToken);
        console.log(decoded)
        const response = await axios.get(`${this.url}/users/${decoded.email}`);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('Error decoding token:', error);
        throw new HttpErrorResponse({ error });
      }
    }
    throw new HttpErrorResponse({ error: "No token found" });
  }
}

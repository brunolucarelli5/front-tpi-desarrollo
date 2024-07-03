import { Injectable } from "@angular/core";
import axios from "axios";
import { LoginI, RegisterI, TokenI } from "./interfaces/token";
import { HttpErrorResponse } from "@angular/common/http";
import { timer } from "rxjs";
import moment from "moment";

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
      await axios.post(`${this.url}/users/register`, body);
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
    const response = (
      await axios.get(`${this.url}/refresh-token`, {
        headers: {
          "refresh-token": tokenObject.refreshToken,
        },
      })
    ).data;
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
}

import { AxiosInstance, AxiosResponse } from "axios";
import {   TUser } from "../types/data";

export default function createAuthApi(http: AxiosInstance){
  return {
    async login({ email, password }: { email: string, password: string }){

      await http.get('/sanctum/csrf-cookie');
      return await http.post<TUser>('/api/auth/login', { email, password })
      
    },
    async check(){
      return  await http.get<TUser>('/api/auth/check');
    },
    async logout(){
      return await http.get<TUser>('/api/auth/logout');
      
    }


  }
}
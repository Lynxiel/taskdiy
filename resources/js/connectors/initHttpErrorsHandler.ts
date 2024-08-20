import { AxiosInstance } from "axios";
import { TErrorBag422 } from "../types/data";
import { useState } from "react";


export default function initHttpErrorsHandler(
	http: AxiosInstance,
){
	http.interceptors.response.use(r=> r, e =>{
		console.log(e);
	
		return Promise.reject(e)
	})
}
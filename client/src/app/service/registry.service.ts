import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
	public url: string;

  constructor(	private _http: HttpClient	) {
  	this.url = Global.url+"/registry";
  }

  //Metodo de prueba de registro.
  test(): Observable<any>{
  	let headers = new HttpHeaders().set("Content-Type", "application/json");
  	return this._http.get(this.url+"/test", {headers: headers});
  }

  //Metodo para obtener el listado completo del registro.
  getRegistry(): Observable<any>{
  	let headers = new HttpHeaders().set("Content-Type", "application/json");
  	return this._http.get(this.url+"/get", {headers: headers});
  }

  //Metodo para obtener solo un registro de la base de datos
  getOne(id): Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(this.url+"/get/"+id, {headers: headers});
  }
}
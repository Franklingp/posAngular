import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
	public url: string;

  constructor(	private _http: HttpClient	) {
  	this.url = Global.url+"/clients";
  }

  //Metodo de prueba para el servidor
  test(): Observable<any>{
  	let headers = new HttpHeaders().set('Content-Type', 'application/json');
  	return this._http.get(this.url+"/test", {headers: headers});
  }

  //Metodo para retornar un listado de clientes del servidor
  getClients(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"/get", {headers: headers});
  }

  //Metodo para obtener un solo cliente del servidor
  getOne(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"/get/"+id, {headers: headers});
  }

}

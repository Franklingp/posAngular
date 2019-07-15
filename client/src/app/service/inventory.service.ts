import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
	public url: string;
	public params: string;

	constructor(	private _http: HttpClient	){
		this.url = Global.url+"/inventory";
	}

	//Metodo para retornar todo el inventario activo del servidor
	getInventory(): Observable<any>{
	  	let headers = new HttpHeaders().set("Content-Type", "application/json");
	  	return this._http.get(this.url+"/obtain/true", {headers: headers});
	}

	//Metodo para obtener los productos deshabilitados del inventario
	getDisabledProducts(): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.get(this.url+"/obtain/false", {headers: headers});
	}

	//Metodo para guardar un nuevo producto
	addProduct(product): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		let newProduct = JSON.stringify(product);
		return this._http.post(this.url+"/add",newProduct , {headers: headers});
	}

	//Metodo para obtener un solo producto de la base de datos
	getProduct(id): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.get(this.url+"/get/"+id, {headers: headers});
	}

	//Metodo para actualizar un producto
	updateProduct(product): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.put(this.url+"/update/"+product._id, product, {headers: headers});
	}

	//Metodo para habilitar o inhabilitar un producto
	updateEnabled(enabled, id): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		if(enabled){
			return this._http.put(this.url+"/enable/"+id, {headers: headers});
		}else{
			return this._http.put(this.url+"/disable/"+id, {headers: headers});
		}
	}

	//Metodo para obtener un producto mediante el nombre o la marca
	getProductBy(params): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.post(this.url+"/get-by", params, {headers: headers});
	}
}

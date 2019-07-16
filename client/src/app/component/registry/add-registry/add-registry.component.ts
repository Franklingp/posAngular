import { Component, OnInit } from '@angular/core';

import { RegistryService } from '../../../service/registry.service';
import { ClientService } from '../../../service/client.service';
import { InventoryService } from '../../../service/inventory.service';

import { ClientModel } from '../../../models/client.model';
import { ProductModel } from '../../../models/product.model';
import { RegistryModel } from'../../../models/registry.model';

@Component({
  selector: 'app-add-registry',
  templateUrl: './add-registry.component.html',
  styleUrls: ['./add-registry.component.css']
})
export class AddRegistryComponent implements OnInit {
	public clientToBuy: any;
	public products: ProductModel[];
	public products_to_select: ProductModel[];
	public success_client: number;
	public success_products: number;
	public registry: RegistryModel;

		//Busqueda de cliente
	public searchClient: {
		key: string,
		value: string
	};

		//Busqueda de productos
	public searchProduct: {
		key: string,
		value: string,
		quantity: number
	};

  constructor(	private _registryService: RegistryService,
  				private _inventoryService: InventoryService,
  				private _clientService: ClientService	) {
  	this.success_client = 0;
  	this.success_products = 0;
  	this.searchClient = {key: "", value: ""};
  	this.searchProduct = {key: "", value: "", quantity: null};

  	this.registry = new RegistryModel({id:"" ,name:"" ,surname:"" ,identification:null }, "" ,0 , [{id: '',name: '', brand: '', price:null ,quantity:null}]);

  	this.products = [{name:"" ,brand:"" , price: null, description: "", category: "", quantity: null, enabled: null, registryId: [""]}];
  }

  ngOnInit() {
  }

  //Metodo para buscar un cliente por nombre o identificacion
  getClient(){
  	this._clientService.getBy(this.searchClient).subscribe(
  		response => {
  			this.clientToBuy = response;
			this.clientToBuy = this.clientToBuy.Client;
  			if(this.clientToBuy.length == 0){
  				alert("No se ha podido encotrado el cliente");
  			}
  			else{
	  			this.success_client = 1;
	  		}
  		},
  		error => {
  			console.log(<any>error);
  			alert("Ha ocurrido un error al intentar encotrar el cliente");
  			//this.success_client = -1;
  		}
  	);
  }

  //Metodo para capturar el cliente seleccionado de el componente hijo
  select(event){
  	this.clientToBuy = event;
  	//console.log(event);
  	console.log(this.clientToBuy);
  	//this.registry.client.id = this.clientToBuy._id;
  	//this.registry.client.name = this.clientToBuy.name;
  	//this.registry.client.surname = this.clientToBuy.surname;
  	//this.registry.client.identification = this.clientToBuy.identification;
  	this.success_client = 2;
  }

  //Metodo para cambiar el cliente seleccionado del componente hijo
  change(){
  	this.success_client = 0;
  }

  //Metodo para buscar un producto de la base de datos
  getProduct(){
  	console.log(this.searchProduct);
  	if(this.searchProduct.key == 'id'){
  		this._inventoryService.getProduct(this.searchProduct.value).subscribe(
  			response => {
  				if(this.products[0].name == ""){
  					this.products[0] = response.Product;
  					console.log(this.products);  
  					this.products[0].quantity = this.searchProduct.quantity;
  					this.registry.total_price = this.products[0].quantity * this.products[0].price;
  					this.success_products = 2;

  				}else{
  					response.Product.quantity = this.searchProduct.quantity;
  					this.products.push(response.Product);
  					this.registry.total_price = this.registry.total_price + (response.Product.quantity * response.Product.price);
  					this.success_products = 2;
  				}
  			},
  			error => {
  				console.log(<any>error);
  				alert("Ha ocurrido un error al intentar obtener el producto de la base de datos");
  			}
  		);
  	}
  	else{
  		this._inventoryService.getProductBy(this.searchProduct).subscribe(
  			response => {  				
  				//console.log(response);
  				this.products_to_select = response.Product;
  				console.log(this.products_to_select);
  				this.success_products = 1;
  			},
  			error =>{
  				console.log(<any>error);
  				alert("Ha ocurrido un error al intentar obtener el producto de la base de datos");
  			}
  		);
  	}
  }

  //Metodo para seleccionar un producto de la lista
  SelectProduct(product){
  	if(this.products[0].name == ""){
  		this.products[0] = product;
		console.log(this.products);  
		this.products[0].quantity = this.searchProduct.quantity;
		this.registry.total_price = this.products[0].quantity * this.products[0].price;
		this.success_products = 2;
  	}
  	else{
  		product.quantity = this.searchProduct.quantity;
		this.products.push(product);
		this.registry.total_price = this.registry.total_price + (product.quantity * product.price);
		this.success_products = 2;
  	}
  }

  //Metodo para eliminar un producto de la lista de compra
  removeProduct(index){
  	//index = index -1;
  	this.registry.total_price = this.registry.total_price - (this.products[index].price * this.products[index].quantity);
  	this.products.splice(index, 1);
  	this.success_products == 2;
  }
}



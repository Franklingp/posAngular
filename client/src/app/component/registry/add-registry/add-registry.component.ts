import { Component, OnInit } from '@angular/core';

import { RegistryService } from '../../../service/registry.service';
import { ClientService } from '../../../service/client.service';
import { InventoryService } from '../../../service/inventory.service';

import { ClientModel } from '../../../models/client.model';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-add-registry',
  templateUrl: './add-registry.component.html',
  styleUrls: ['./add-registry.component.css']
})
export class AddRegistryComponent implements OnInit {
	public clientToBuy: any;
	public products: [ProductModel];
	public success_client: number;
	public success_products: boolean;

		//Busqueda de cliente
	public searchClient: {
		key: string,
		value: string
	};

  constructor(	private _registryService: RegistryService,
  				private _inventoryService: InventoryService,
  				private _clientService: ClientService	) {
  	this.success_client = 0;
  	this.success_products = false;
  	this.searchClient = {key: "", value: ""};
  	//this.client = new ClientModel("","",null,null,[""]);
  }
 
  ngOnInit() {
  }

  //Metodo para buscar un cliente por nombre o identificacion
  getClient(){
  	this._clientService.getBy(this.searchClient).subscribe(
  		response => {
			this.clientToBuy = response;
			this.clientToBuy = this.clientToBuy.Client;
  			console.log(response);
  			console.log(this.clientToBuy);
  			this.success_client = 1;
  		},
  		error => {
  			console.log(<any>error);
  			alert("Ha ocurrido un error al intentar encotrar el cliente");
  			this.success_client = -1;
  		}
  	);
  }

  //Metodo para capturar el cliente seleccionado de el componente hijo
  select(event){
  	this.clientToBuy = event;
  	//console.log(event);
  	console.log(this.clientToBuy)
  	this.success_client = 2;
  }
}



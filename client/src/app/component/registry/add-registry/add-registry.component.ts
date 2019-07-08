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
	public client: any;
	public products: [ProductModel];
	public success_client: boolean;
	public success_products: boolean;

		//Busqueda de cliente
	public searchClient: {
		key: string,
		value: string
	};

  constructor(	private _registryService: RegistryService,
  				private _inventoryService: InventoryService,
  				private _clientService: ClientService	) {
  	this.success_client = false;
  	this.success_products = false;
  	this.searchClient = {key: "", value: ""};
  	//this.client = new ClientModel("","",null,null,[""]);
  }
 
  ngOnInit() {
  }

  //Metodo para buscar un cliente
  getClient(){
  	this._clientService.getBy(this.searchClient).subscribe(
  		response => {
  			console.log(response);
  			this.client = response;
  			this.client = this.client.Client;
  			console.log(this.client);
  			this.success_client = true;

  		},
  		error => {
  			console.log(<any>error);
  			alert("Ha ocurrido un error al intentar encotrar el cliente");
  		}
  	);
  }
}

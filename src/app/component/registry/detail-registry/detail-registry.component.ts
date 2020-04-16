import { Component, OnInit } from '@angular/core';
import { RegistryService } from '../../../service/registry.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientModel } from '../../../models/client.model';
import { RegistryModel } from '../../../models/registry.model';
import { ProductModel } from '../../../models/product.model';

 
@Component({
  selector: 'app-detail-registry',
  templateUrl: './detail-registry.component.html',
  styleUrls: ['./detail-registry.component.css']
})
export class DetailRegistryComponent implements OnInit {
	public id: string;
	public success: boolean;
	public client: ClientModel;
	public registry: RegistryModel;
	public products: [ProductModel];
	

  constructor(	private _registryService: RegistryService,
  				private _route: ActivatedRoute	) {
  	this.success = false;
  }

  ngOnInit() {
  	this.getId();
  	this.getOne();
  }

  //Metodo para obtener el id de la Url
  getId(){
  	this._route.params.subscribe(
  		params => {
  			this.id = params.id;
  			//console.log(this.id);
  		}
  	);
  }

  //Metodo para obtener un solo registro con todos sus detalles;
  getOne(){
  	this._registryService.getOne(this.id).subscribe(
  		response => {
  			this.registry = response.Registry;
  			this.client = response.Client;
  			this.products = response.Products;
  			console.log(this.registry, this.client, this.products);
  			this.success = true;
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }
}

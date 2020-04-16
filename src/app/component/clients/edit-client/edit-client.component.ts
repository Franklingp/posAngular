import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../service/client.service';
import { ClientModel } from '../../../models/client.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: '../add-client/add-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
	public title: string;
	public client: ClientModel;
	public newId: string;
	public success: number;

  constructor(	private _clientService: ClientService,
  				private _route: ActivatedRoute) {
  	this.title = "Editar cliente";
  	this.client = new ClientModel("","",null,true,[""]);
  	this.success = 0;
  }

  ngOnInit() {
  	this.getId();
  	this.getClient();
  }

  //Metodo para obtener el cliente
  getClient(){
  	this._clientService.getOne(this.newId).subscribe(
  		response => {
  			this.client = response.Client;
  			console.log(this.client);
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  //Metodo para obtener el id de la url
  getId(){
  	this._route.params.subscribe(
  		params => {
  			this.newId = params.id;
  		}
  	);
  }

  //Metodo para actualizar el cliente
  onSubmit(dato){
  	this._clientService.updateClient(this.client).subscribe(
  		response => {
  			console.log(response);
  			this.success = 1;
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }
}

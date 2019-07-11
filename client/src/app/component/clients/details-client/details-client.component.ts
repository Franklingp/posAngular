import { Component, OnInit, Input } from '@angular/core';
import { ClientModel } from '../../../models/client.model';
import { ClientService } from '../../../service/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
	public success: boolean;
	public client: ClientModel;
	public id: string;

    @Input() clientInRegistry: ClientModel;

  constructor(	private _clientService: ClientService,
  				private _route: ActivatedRoute	) {
  	this.success = false;
  }

  ngOnInit() {
  	this.details();
  	//this.getClient();
  }

  //Metodo para comprobar si es detalles o si es en registro
  details(){
    if(this.clientInRegistry){
      console.log(this.clientInRegistry);
      this.client = this.clientInRegistry;
      console.log(this.client);
      this.success = true;
    }else{
      this.getId();
      this.getClient();
    }
  }

  //Metodo para obtener el id del cliente 
  getId(){
  	this._route.params.subscribe(
  		response => {
  			console.log(response);
  			this.id = response.id;
  		}
  	);
  }

  //Metodo para obtener el cliente del servidor
  getClient(){
  	this._clientService.getOne(this.id).subscribe(
  		response => {
  			this.client = response.Client;
  			console.log(this.client);
  			this.success = true;
  		},
  		error => { 
  			console.log(<any>error);
  		}
  	);
  }
}

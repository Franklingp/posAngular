import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../../../models/client.model';
import { ClientService } from '../../../service/client.service';

@Component({
  selector: 'app-get-clients',
  templateUrl: './get-clients.component.html',
  styleUrls: ['./get-clients.component.css']
})
export class GetClientsComponent implements OnInit {
	public success: boolean;
	public clients: [ClientModel];

  constructor(	private _clientService: ClientService	) {
  	this.success = false;
  }

  ngOnInit() {
  	this.test();
  	this.getClients();
  }

  //Metodo de prueba para comprobar conexion con el servidor
  test(){
  	this._clientService.test().subscribe(
  		response => {
  			console.log(response);
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  //Metodo para obtener el listado de clientes del servidor
  getClients(){
  	this._clientService.getClients().subscribe(
  		response => {
  			
  			this.clients = response.Client;
  			this.success = true;
  			console.log(this.clients);
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

    @Input() listClients: [ClientModel];
    @Output() selectClient= new EventEmitter();

  constructor(	private _clientService: ClientService	) {
  	this.success = false;
  }

  ngOnInit() {
  	this.test();
  	this.verificar();
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
  		//	console.log(this.clients);
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  //Metodo que verifica si buscamos el listado completo o el de ciertos clientes (cuando se realiza una compra)
  verificar(){
    if(this.listClients){
        this.clients = this.listClients;
        console.log(this.clients);
        this.success = true;
      }else{
        this.getClients();
      }
  }

  //Metodo para retornar el cliente seleccionado a la seccion de compras
  select(client, event){
   // console.log(event);
    //console.log(client);
    this.selectClient.emit(client);
  }
}

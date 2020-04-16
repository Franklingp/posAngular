import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../service/client.service';
import { ClientModel } from '../../../models/client.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
	public title: string;
	public client: ClientModel;
	public success: number;
  public newId: string;

  constructor(	private _clientService: ClientService	) {
  	this.title = "Registrar un cliente";
  	this.client = new ClientModel("","",null,true,[""]);
  	this.success = 0;
  }

  ngOnInit() {
  }

  //Metodo para capturar evento cuando se guarda el formulario para registrar un nuevo cliente
  onSubmit(company){

  	if(company == true){
  		this.client.surname = "";
  	}

    //console.log(this.client);
  	this._clientService.addClient(this.client).subscribe(
  		response => {
  			//console.log(response);
        this.newId = response.Client._id;
        //console.log(this.newId);
  			this.success = 1;
  		},
  		error => {
  			console.log(<any>error);
  			this.success = -1;
  		}
  	);
  }
}

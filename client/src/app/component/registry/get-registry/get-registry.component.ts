import { Component, OnInit } from '@angular/core';
import { RegistryModel } from '../../../models/registry.model';
import { RegistryService } from '../../../service/registry.service';

@Component({
  selector: 'app-get-registry',
  templateUrl: './get-registry.component.html',
  styleUrls: ['./get-registry.component.css']
})
export class GetRegistryComponent implements OnInit {
	public registry: [RegistryModel];
	public success: boolean;

  constructor(	private _registryService: RegistryService	) {
  	this.success = false;
  }

  ngOnInit() {
  	this.test();
    this.getRegistry();
  }

  //Metodo de prueba para servidor
  test(){
  	this._registryService.test().subscribe(
  		response => {
  			console.log(response);
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  //Metodo para obtener el registro completo
  getRegistry(){
    this._registryService.getRegistry().subscribe(
      response => {
        this.registry = response.Registry;
        console.log(this.registry);
        this.success = true;
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}

import { Component, OnInit, Input } from '@angular/core';
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
  	this.success = null;
  }

  @Input() arrayRegistry: string[];

  ngOnInit() {
  	this.validate();
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

  //Metodo para validar en caso de que sea si se requiere todo el inventario o solo ciertos registros
  validate(){
    if(this.arrayRegistry){
      this._registryService.getSet(this.arrayRegistry).subscribe(
        response => {
          let aux: any;
          aux = response;
          aux = aux.Registry;
          this.registry = aux;
          console.log(this.registry);
          this.success = true;
        },
        error =>{
          if(!(this.arrayRegistry.length == 0)){
             console.log(<any>error);
             alert('Ha ocurrido un error al intentar obtener los registros relacionados a este cliente');
          }
          this.success = false;
        }
      );
    }
    else{
      this.test();
      this.getRegistry();
    }
  }
}

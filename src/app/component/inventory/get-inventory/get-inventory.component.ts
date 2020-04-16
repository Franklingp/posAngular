import { Component, OnInit, Input } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-get-inventory',
  templateUrl: './get-inventory.component.html',
  styleUrls: ['./get-inventory.component.css'],
  providers: [InventoryService]
})
export class GetInventoryComponent implements OnInit {
	public inventory: [ProductModel];
  public success: number;
  public title: string;

  @Input() productToBuy: [ProductModel];
  
  constructor(	private _inventoryService: InventoryService	) { 
    this.success = 0;
    this.title = "Inventario";
  }

  ngOnInit() {
  	this.validate();
  }

  //Metodo para retornar el inventario a la pagina
  getInventory(){
  	this._inventoryService.getInventory().subscribe(
  		response => {
        this.inventory = response.Product;
        this.success = 1;
  			console.log(this.inventory);
  			},
  		error =>{
  			console.log(<any>error);
  		}
  	);
  }

  //Metodo para validar si se requiere el inventario completo o si estamos listado productos
  validate(){
    if(this.productToBuy){
        this.inventory = this.productToBuy;
        this.title = "Productos seleccionados";
        this.success = 1;
        console.log(this.inventory);
      }else{
        this.getInventory();
      }
  }
}

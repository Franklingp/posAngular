import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-get-inventory',
  templateUrl: './get-inventory.component.html',
  styleUrls: ['./get-inventory.component.css'],
  providers: [InventoryService]
})
export class GetInventoryComponent implements OnInit {
	public inventory: ProductModel[];
  public success: number;

  constructor(	private _inventoryService: InventoryService	) { 
    this.success = 0;
  }

  ngOnInit() {
  	this.getInventory();
  }

  //Metodo para retornar el inventario a la pagina
  getInventory(){
  	this._inventoryService.getInventory().subscribe(
  		response => {
        this.inventory = response.Product;
  			console.log(this.inventory);
  			},
  		error =>{
  			console.log(<any>error);
  		}
  	);
  }
}

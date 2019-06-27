import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-disabled-products',
  templateUrl: '../get-inventory/get-inventory.component.html',
  styleUrls: ['./disabled-products.component.css']
})
export class DisabledProductsComponent implements OnInit {
	public title: string;
	public inventory: ProductModel[];
	public success: boolean;

  constructor(	private _inventoryService: InventoryService	) {
  	this.title = "Productos deshabilitados";
  	this.success = false;
  }

  ngOnInit() {
  	this.getDisabledProducts();
  }

  //Metodo para obtener los productos deshabilitados del inventario
  getDisabledProducts(){
  	this._inventoryService.getDisabledProducts().subscribe(
  		response => {
  			console.log(response);
  			this.inventory = response.Product;
  			this.success = true;
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

}
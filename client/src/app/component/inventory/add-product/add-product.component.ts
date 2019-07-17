import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import { InventoryService } from '../../../service/inventory.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [InventoryService]
})
export class AddProductComponent implements OnInit {
	public product: ProductModel;
  public success: number;
  public id: string;

  constructor(	private _inventoryService: InventoryService	) {
  	this.product = new ProductModel("","","",null,"","",null,true,[""]);
    this.success = 0;
  }

  ngOnInit() {
  }

  //Metodo para agregar un nuevo producto a la base de datos
  addProduct(product){
  	this._inventoryService.addProduct(product).subscribe(
  		response => {
  			console.log(response);
        this.success = 1;
        this.id = response.Product._id;
  		},
  		error => {
  			console.log(<any>error);
        this.success = -1;
  		}
  	);
  }
}

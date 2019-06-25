import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
	public id: string;
	public product: ProductModel;
	public success: boolean;

  constructor(	private _inventoryService: InventoryService,
  				private _route: ActivatedRoute,
				private _router: Router) {
  	this.success = false;
	}

  ngOnInit() {
  	this.getId();
  	this.getProduct();
  }

  //Metodo para obtener el id de la url
  getId(){
  	this._route.params.subscribe(
  		params => {
  			this.id = params.id;
  			console.log(this.id);
  		}
  	);
  }

  //Metodo para obtener un solo producto de la base de datos.
  getProduct(){
  	this._inventoryService.getProduct(this.id).subscribe(
  		response => {
  			this.product = response.Product;
  			this.success = true;
  			console.log(this.product);
  		},
  		error =>{
  			console.log(<any>error);
  		}
  	);
  }
}

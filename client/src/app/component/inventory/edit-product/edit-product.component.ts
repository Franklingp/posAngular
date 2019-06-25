import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InventoryService } from '../../../service/inventory.service';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: '../details-product/details-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
	public id: string;
	public product: ProductModel;
	public success: boolean;
	public edit: boolean;
	public title: string;

  constructor(	private _inventoryService: InventoryService,
  				private _route: ActivatedRoute,
  				private _router: Router	) { 
  	this.success = false;
  	this.edit = true;
  	this.title = "Editar"
  }

  ngOnInit() {
  	this.getId();
  	this.getProduct();
  }

  //Metodo para obtenerer el id del producto de la Url
  getId(){
  	this._route.params.subscribe(
  		params => {
  			this.id = params.id;
  			//console.log(this.id);
  		}
  	);
  }

  //Metodo para obtener el producto de la base de datos
  getProduct(){
  	this._inventoryService.getProduct(this.id).subscribe(
  		response => {
  			this.product = response.Product;
  			this.success = true;
  			console.log(this.product);
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }
}

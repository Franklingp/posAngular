import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetInventoryComponent } from './component/inventory/get-inventory/get-inventory.component';
import { AddProductComponent } from './component/inventory/add-product/add-product.component';
import { EditProductComponent } from './component/inventory/edit-product/edit-product.component';
import { DetailsProductComponent } from './component/inventory/details-product/details-product.component';
import { DisabledProductsComponent } from './component/inventory/disabled-products/disabled-products.component';

const routes: Routes = [
	//inventory
	{path: "inventory", component: GetInventoryComponent},
	{path: "inventory/add", component: AddProductComponent},
	{path: "inventory/edit/:id", component: EditProductComponent},
	{path: "inventory/detail/:id", component: DetailsProductComponent},
	{path: "inventory/disabled", component: DisabledProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

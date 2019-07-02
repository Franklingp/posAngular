import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetInventoryComponent } from './component/inventory/get-inventory/get-inventory.component';
import { AddProductComponent } from './component/inventory/add-product/add-product.component';
import { EditProductComponent } from './component/inventory/edit-product/edit-product.component';
import { DetailsProductComponent } from './component/inventory/details-product/details-product.component';
import { DisabledProductsComponent } from './component/inventory/disabled-products/disabled-products.component';

import { GetClientsComponent } from './component/clients/get-clients/get-clients.component';
import { AddClientComponent } from './component/clients/add-client/add-client.component';
import { DetailsClientComponent } from './component/clients/details-client/details-client.component';
import { EditClientComponent } from './component/clients/edit-client/edit-client.component';

import { GetRegistryComponent } from './component/registry/get-registry/get-registry.component';
import { AddRegistryComponent } from './component/registry/add-registry/add-registry.component';
import { DetailRegistryComponent } from './component/registry/detail-registry/detail-registry.component';

const routes: Routes = [
	//inventaro
	{path: "inventory", component: GetInventoryComponent},
	{path: "inventory/add", component: AddProductComponent},
	{path: "inventory/edit/:id", component: EditProductComponent},
	{path: "inventory/detail/:id", component: DetailsProductComponent},
	{path: "inventory/disabled", component: DisabledProductsComponent},

	//clientes
	{path: "clients", component: GetClientsComponent},
	{path: "clients/add", component: AddClientComponent},
	{path: "clients/details/:id", component: DetailsClientComponent},
	{path: "clients/edit/:id", component: EditClientComponent},

	//registro
	{path: "registry", component: GetRegistryComponent},
	{path: "registry/add", component: AddRegistryComponent},
	{path: "registry/detail/:id", component: DetailRegistryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

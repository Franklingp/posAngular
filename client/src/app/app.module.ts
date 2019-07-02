import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AddProductComponent } from './component/inventory/add-product/add-product.component';
import { GetInventoryComponent } from './component/inventory/get-inventory/get-inventory.component';
import { DetailsProductComponent } from './component/inventory/details-product/details-product.component';
import { EditProductComponent } from './component/inventory/edit-product/edit-product.component';
import { DisabledProductsComponent } from './component/inventory/disabled-products/disabled-products.component';
import { GetClientsComponent } from './component/clients/get-clients/get-clients.component';
import { AddClientComponent } from './component/clients/add-client/add-client.component';
import { DetailsClientComponent } from './component/clients/details-client/details-client.component';
import { EditClientComponent } from './component/clients/edit-client/edit-client.component';
import { GetRegistryComponent } from './component/registry/get-registry/get-registry.component';
import { DetailRegistryComponent } from './component/registry/detail-registry/detail-registry.component';
import { AddRegistryComponent } from './component/registry/add-registry/add-registry.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    GetInventoryComponent,
    DetailsProductComponent,
    EditProductComponent,
    DisabledProductsComponent,
    GetClientsComponent,
    AddClientComponent,
    DetailsClientComponent,
    EditClientComponent,
    GetRegistryComponent,
    DetailRegistryComponent,
    AddRegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

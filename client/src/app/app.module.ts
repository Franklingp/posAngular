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

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    GetInventoryComponent,
    DetailsProductComponent,
    EditProductComponent,
    DisabledProductsComponent
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

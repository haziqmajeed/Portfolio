import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './Component/products/products.component';
import { SingleProductComponent } from './Component/single-product/single-product.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Component/add-product/add-product.component';
import {FormsModule} from '@angular/forms';
import { SubmitProductComponent } from './Component/submit-product/submit-product.component'

const appRoutes: Routes = [
  {path:'products', component:ProductsComponent},
  {path:'addProduct', component:AddProductComponent},
  {path:'submitProduct/:id', component:SubmitProductComponent},
  {path:'singleProduct/:id', component:SingleProductComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    SingleProductComponent,
    AddProductComponent,
    SubmitProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

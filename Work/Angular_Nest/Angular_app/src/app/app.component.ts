import { Component, Input, OnInit } from '@angular/core';
import {ProductService} from './product.service'
import { ProductModel } from './ProductModel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'my-first-project';
  //obj : any;
  constructor(private product:ProductService){
    // this.product.getData().subscribe((data)=>{
    //   console.log('data',data);
    //   this.obj=data;
    //   console.log('data',this.obj[0]._id);
    //})
    
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  //@Input() products:any;
  obj : any;
  constructor(private product:ProductService){
    this.product.getData().subscribe((data)=>{
      this.obj=data;
    })
  }

  onDelete(object : any){
    const index = this.obj.indexOf(object);
    this.obj.splice(index,1)
    this.product.deleteData(object._id).subscribe((data)=>{
      console.log('data',data);
    });
  }
  
}

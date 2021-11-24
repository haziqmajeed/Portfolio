import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  obj
  flag
  constructor(private route: ActivatedRoute,private product:ProductService) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
    this.product.getSingleProduct(params.id).subscribe((data)=>{
      this.obj=data;
      this.flag=true
      console.log("data",this.obj)
    })
  });
  }

}

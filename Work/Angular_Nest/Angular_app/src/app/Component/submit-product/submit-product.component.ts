import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/product.service';
@Component({
  selector: 'app-submit-product',
  templateUrl: './submit-product.component.html',
  styleUrls: ['./submit-product.component.css']
})
export class SubmitProductComponent implements OnInit {
  submitSuccess
  submitFail
  constructor(private route: ActivatedRoute,private product:ProductService) { }
  
  ngOnInit(): void {
    
    
  }
  onSubmit(data){
    console.warn("datacoming",data)
    this.route.params.subscribe((params: Params) => {
      console.warn("params.id",params.id)
      this.product.updateData({id:params.id,data:data}).subscribe(data=>{
        if (data){
          this.submitSuccess = true
        }
        else{
          this.submitFail = true
        }
      })
      
    });
    
  }
  

}

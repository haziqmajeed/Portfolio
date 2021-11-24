import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  submitSuccess
  submitFail
  
  constructor(private product:ProductService) {
   }
  

  onSubmit(data){
    console.warn("datacoming",data)
    setTimeout(() => {
      this.submitSuccess = false;
    }, 5000);
    this.product.submitData(data).subscribe((incomming)=>{
      if (incomming){
        this.submitSuccess = true;
      }else{
        this.submitFail = true;
      }
    });
  }

  ngOnInit(): void {
  }

}

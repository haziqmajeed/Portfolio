import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { 

  }
  getData(){
    let url = 'http://localhost:3000/products';
    return this.http.get(url);
  }
  getSingleProduct(id){
    let url = 'http://localhost:3000/products/'+id;
    return this.http.get(url);
  }
  deleteData(id){
    let url = 'http://localhost:3000/products/'+id;
    return this.http.delete(url);
  }
  submitData(data){
    console.log("Recieving Id" , data);
    let url = 'http://localhost:3000/products/';
    return this.http.post(url,data);
  }
  updateData(data){
    console.log("Recieving Id" , data);
    let url = 'http://localhost:3000/products/'+data.id;
    return this.http.patch(url,data.data)
  }
}

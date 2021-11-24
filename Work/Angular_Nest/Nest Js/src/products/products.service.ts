import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { threadId } from 'worker_threads';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
        ) {}
        
    async insertProduct(title: string, discription: string, price: number) {
        console.log("title",discription)
        //const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title,
            discription,
            price,
        });
        let output;
        const result = await newProduct.save().then((success)=>{
            output = true;
        }).catch((err)=>{
            output = false;
        });
        // console.log("result",result);
        return output;
    }

    async getProducts(){
        const products = await this.productModel.find();
        return products;
    }
    async getSingleProduct(id:string){
        const products = await this.productModel.findById(id);
        console.log('products',products);
        return products;
    }
    async updateProduct(id:string,title: string, discription: string, price: number){
        console.log('title',title);
        const updatedProduct = await this.productModel.findById(id);
        updatedProduct.title = title;
        updatedProduct.discription = discription;
        updatedProduct.price = price;
        let output;
        await updatedProduct.save().then((success)=>{
            output = true;
        }).catch((err)=>{
            output = false;
        });
        return output;;
    }
    async deleteProduct(id:string){
        const products = await this.productModel.deleteOne({_id:id}).exec();
        return products;
    }
}

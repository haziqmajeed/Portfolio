import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { ProductsService } from './products.service';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    addProduct(
      @Body('title') prodTitle: string,
      @Body('discription') prodDesc: string,
      @Body('price') prodPrice: number,
    ) {
        console.log("prodTitle",prodDesc);
      const generatedId = this.productsService.insertProduct(prodTitle,prodDesc,prodPrice,);
      console.log("generatedId",generatedId);
      return generatedId;
    }
    @Get()
    getProduct(){
        return this.productsService.getProducts();
    }
    @Get(':id')
    getSingleProduct(@Param('id') prodId : string){
        return this.productsService.getSingleProduct(prodId);
    }
    @Patch(':id')
    updateProduct(
        @Param('id') prodId : string,
        @Body('title') prodTitle: string,
        @Body('discription') prodDesc: string,
        @Body('price') prodPrice: number,
        ){
        const result = this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice);
        console.log("result",result);
        return result;
    }
    @Delete(':id')
    deleteProduct(@Param('id') prodId : string){
        return this.productsService.deleteProduct(prodId);
    }
  }
  
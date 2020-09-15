const { default: GenericServices } = require("./GenericServices");

class ProductsService extends GenericServices {
    constructor(){
        super();
    }
    addProduct = (data) => this.post("products",data);
    getProduct = () => this.get("products");
    deleteProduct = (_id) => this.delete("products/" + _id);
    updateProduct = (_id,data) => this.put("products/" + _id , data);
    getSingle = (_id) => this.single("products/" + _id);
}

let productsService =new ProductsService();
export default productsService;
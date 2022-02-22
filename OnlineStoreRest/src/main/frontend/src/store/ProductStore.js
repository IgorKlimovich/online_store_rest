import {makeAutoObservable} from "mobx";

export default class ProductStore {

    constructor() {
        this._types =[
            {id:1, name:'холодильники'},
            {id:2, name: 'смартфоны'}
        ]
        this._brands =[
            {id:1, name:'samsung'},
            {id:2, name: 'apple'}
        ]
        this._product=[
            {id:1, name:'qqqqqq',price:12222,rating:5},
            {id:2, name:'eeeee',price:555,rating:6},
            {id:3, name:'errrr',price:666,rating:4},
            {id:4, name:'ttttt',price:777,rating:3},
            {id:5, name:'yyyy',price:7777,rating:9}
        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands){
        this._brands=brands
    }

    setProduct(product){
        this._product=product
    }

    get types(){
        return this._types
    }

    get brands(){
        return this._brands
    }

    get product(){
        return this._product
    }
}
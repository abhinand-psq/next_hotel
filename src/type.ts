export type product1 ={
    id:string   
    createdAt:number  
    title:String
    desc:String
    img:string
    price :number
   isFeatured:boolean
    options :object
    category:object
    catSlug :String
}

export type products ={
    id:string   
    createdAt:number  
    title:String
    desc:String
    img:string
    price :number
   isFeatured:boolean
    options :object
    category:object
    catSlug :String
}[]

export type cat={
    id:string
    createdAt:number
    title:String
    desc:string
    color:string
    img:string
    slug :string
    products:products
}[]
const {mongoose} = require('./database')

const Product = require('./Product')


/**
 * Encontar un documento
 */
Product.findOne({name: "Mobile 3"}, (error, product)=>{
    if(error){
        //console.error(error)
    }else{
        //console.log(product)
    }
})


/**
 * Condiciones
 */
Product.find({status: false}, (error, product)=>{
    if(error){
        //console.error(error)
    }else{
        //console.log(product)
    }
})

/**
 * Precios entre 10 y 40
 */
Product.find({
    $and: [
        {price:{$gte: 10}},
        {price:{$lte: 40}}
    ]
}, (error, product)=>{
    if(error){
        //console.error(error)
    }else{
        //console.log(product)
    }
})



/**
 * Where
 */
Product.find()
.where('status')
.equals(true)
.exec((error, product)=>{
    if(error){
        //console.error(error)
    }else{
        //console.log(product)
    }
})


/**
 * WHERE 2
 */
Product.find()
.where('price').gte(10)
.where('price').lte(40)
.exec((error, product)=>{
    if(error){
        //console.error(error)
    }else{
        //console.log(product)
    }
})


/**
 * LIKE, iniciar con 'mob'
 */
Product.find({name: new RegExp('^' + 'mob', 'i')}, (error, product)=>{
    if(error){
        //console.error(error)
    }else{
        //console.log(product)
    }
}
)
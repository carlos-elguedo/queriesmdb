const {mongoose} = require('./database')

const Product = require('./Product')

/**
 * LIKE, termina con 'top 1'
 */


Product.find({name: new RegExp( "top 1" + '$', "i")}, (error, product)=>{
    if(error){
        console.error(error)
    }else{
        console.log("Termina en la palabra clave")
        console.log(product)
    }
}
)



/**
 * LIKE, contiene la cadena 'bi'
 */


Product.find({name: new RegExp( "to", "i")}, (error, product)=>{
        if(error){
            console.error(error)
        }else{
            console.log("Termina en la palabra clave")
            console.log(product)
        }
    }
)




/**
 * Sort ascendiente
 * -1 para descendiente
 */

Product.find()
    .sort({'price': 1})
    .exec(function(error, products){
        if(error){
            throw error
        }else{
            console.log('Ordenados ascendientemente')
            console.log(products)
        }
    })



/**
 * LIMIT
 */

Product.find()
    .sort({'price': 1})
    .limit(3)
    .exec(function(error, products){
        if(error){
            throw error
        }else{
            console.log('Ordenados ascendientemente con limite')
            console.log(products)
        }
    })





/**
 * Seleccionado con fechas
 */

Product.aggregate([
    {
        $project:{
            name: 1,
            price: 1,
            quantity: 1,
            date: 1,
            day: {$dayOfMonth: "$date"},
            month: {$month: "$date"},
            year: {$year: "$date"}
        }
    },
    {
        $match:{
            day: 20,
            month: 11,
            year: 2017
        }
    }
], function(error, products){
    if(error){
        throw error
    }else{
        console.log('Filtrando desde la fecha')
        console.log(products)
    }
})








/**
 * SUM
 */


Product.aggregate([
    {
        $group:{
            _id: '',
            total: {$sum: "$quantity"}
        }
    }
], function(error, products){
    if(error){
        throw error
    }else{
        console.log('Sumando todas las cantidades sencillamente')
        console.log(products)
    }
})



/**
 * Sumando con condiciones
 */


Product.aggregate([
    {
        $match:{
            $and:[
                {price: {$gte: 10}},
                {price: {$lte: 40}}
            ]
        }
    },
    {
        $group:{
            _id: '',
            total: {$sum: "$quantity"}
        }
    }
], function(error, products){
    if(error){
        throw error
    }else{
        console.log('Sumando con condiciones')
        console.log(products)
    }
})


/**
 * Sumando. Total
 */

Product.aggregate([
    {
        $group:{
            _id: '',
            total: {
                $sum: {$multiply: ["$price",  "$quantity"] }
            }
        }
    }
], function(error, products){
    if(error){
        throw error
    }else{
        console.log('Sumando el total, antes calculado')
        console.log(products)
    }
})


/**
 * COUNT, contando elementos
 * count esta depreciado, hay que usar: countDocuments o estimatedDocumentCount
 */

Product.estimatedDocumentCount({},  function(error, result){
    if(error){
        throw error
    }else{
        console.log('total de procuctos, contando: ')
        console.log(result)
    }
})


/**
 * COUNT, contando elementos con condiciones
 * count esta depreciado, hay que usar: countDocuments o estimatedDocumentCount
 */

Product.countDocuments({status: true},  function(error, result){
    if(error){
        throw error
    }else{
        console.log('total de procuctos, contando con condicion: ')
        console.log(result)
    }
})






/**
 * MIN and MAX
 */

Product.aggregate([
    {
        $group:{
            _id: '',
            min: {$min: "$price"}
        }
    }
], function(error, products){
    if(error){
        throw error
    }else{
        console.log('El minimo precio es')
        console.log(products[0].min)
    }
})



/**
 * AVG, promedio
 */

Product.aggregate([
    {
        $group:{
            _id: '',
            avg: {$avg: "$price"}
        }
    }
], function(error, products){
    if(error){
        throw error
    }else{
        console.log('precio promedio:')
        console.log(products[0].avg)
    }
})




/**
 * Group by
 */


Product.aggregate([
    {
        $group:{
            _id: "$status",
            countProduct: {$sum: 1},
            sumQuantity: {$sum: '$quantity'},
            maxPrice: { $max: '$price'},
            minPrice: { $min: '$price'},
            avgPrice: { $avg: '$price'}
        }
    }
], function(error, products){
    if(error){
        throw error
    }else{
        console.log('Datos agrupados:')
        console.log(products)
    }
})


/**
 * Having
 */

Product.aggregate([
    {
        $group:{
            _id: "$status",
            countProduct: {$sum: 1},
            sumQuantity: {$sum: '$quantity'},
            maxPrice: { $max: '$price'},
            minPrice: { $min: '$price'},
            avgPrice: { $avg: '$price'}
        }
    },
    {
        $match:{sumQuantity: {$gt: 40}}
    }
], function(error, products){
    if(error){
        throw error
    }else{
        console.log('Datos agrupados:')
        console.log(products)
    }
})
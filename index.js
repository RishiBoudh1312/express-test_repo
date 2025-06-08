import 'dotenv/config'
import express from 'express'

const app = express()

const port = process.env.PORT || 3000

app.use(express.json());

// app.get('/' , (req,res) =>{
//     res.send("Welcome to Backend Journey...")
// })
// app.get('/about' , (req,res)=>{
//     res.send("Here is all about Roadmap to Backend Developer")
// })

let teaData = []
let nextId  = 1 // using to uniquely identify each tea..

app.post('/teas' , (req , res)=>{
    
    const {name,price} = req.body
    const newTea = {
        id : nextId++, name , price
    }
    teaData.push(newTea);
    res.status(200).send(newTea);

})

// to display array of tea object.

app.get('/teas' , (req,res)=>{
    return res.status(200).send(teaData);
})

//get a particular tea -> localhost:port/teasid

app.get('/teas/:id' , (req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if(!tea){
        res.status(404).send("No tea of such type in Menu ");
    }
    else{
        return res.status(200).send(tea);
    }
})

//update a particular tea
app.put('/teas/:id' , (req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id));

    if(!tea){
        // means there is no such tea of this type
        res.status(400).send("No such tea of this type")

    }
    else{

        const {name , price} = req.body;
        tea.name = name;
        tea.price = price;
        return res.status(200).send(tea);
    }

})

//delete an entry
app.delete('/teas/:id' , (req,res)=>{
    const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id));

    if(teaIndex === -1){
        // means there is no such tea of this type
        res.status(400).send("No such tea of this type")

    }
    else{

        teaData.splice(teaIndex,1);

        return res.status(200).send(tea);
    }

})

app.listen(port , ()=>{
    console.log(`Server is listening at port ${port}...`)
})


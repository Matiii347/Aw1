import express from 'express';
import {readFile,writeFile} from 'fs/promises'

//Crear Instancia
const app = express()

//Configurar Puerto
const port = 3000

//Le da la capacidad a express de entender los json
app.use(express.json())

app.listen(port, () => (
    console.log(`Servidor levantado en Puerto ${port}`)
))

const file=await readFile('./data.json','utf-8')
const userData=JSON.parse(file)

const objetos = [
    { name: 'Auto', color: 'Rojo' },
    { name: 'Arbol', color: 'Verde' },
    { name: 'Rio', color: 'Azul' },
    { name: 'Casa', color: 'Amarilla' }
]
app.get('/',(req,res)=>{
    res.send("Hola Mundo!")
})

app.get('/colorDe/:objeto', (req,res)=>{
    const obj=req.params.objeto
    const result=objetos.find(e=>e.name === obj)
    
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json(`${obj} no se encuentra`)
    }
})

app.post('/ColorDePost', (req,res)=>{
    console.log(req.headers)

    const obj=req.body.objeto
   
    const result=objetos.find(e=>e.name === obj)
    
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json(`${obj} no se encuentra`)
    }
})

app.get('/users/all',(req,res)=>{
    res.status(200).json(userData)
})

app.put('/users/salary/update:userID',(req,res)=>{
    const user_id=req.params.userID
    const newSalary=req.body.salary

    try {
        const i=userData.findIndex(e => e.id == user_id)
        if (index !== -1) {
            userData[i].salary=newSalary
            writeFile('./data.json', JSON.stringify(userData))
            res.status(200).json('Salario Actualizado')
        }else{
            res.status(400).json('Usuario No encontrado')
        }
    } catch (error) {
        res.send(500).json('Error al actualizar el Salario')
    }
})
import express from 'express';
import dotenv from 'dotenv';

//Traer nuestras Variables de Entorno
dotenv.config()

//Crear Instancia de la App
const app = express()

//Configurar Puerto
const port = process.env.PORT || 3000

//Levantar Puerto
app.listen(port, ()=>{
    console.log(`Servidor levantado en puerto ${port}`)
})

//Definicion de rutas
app.get('/', (req,res)=>{
    res.send('Hola Mundo!')
})

app.get('/codigos', (req,res)=>{
    res.send('js!')
})
const express = require ("express")

const app = express()
app.use(express.json())
const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));



const port = (process.env.PORT || '8000');


app.listen(port, () => console.log(`Running server on Port ${port}`))
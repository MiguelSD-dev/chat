const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de la base de datos
mongoose.connect('mongodb://localhost:27017/tresenraya', {});

// Configura el middleware para manejar datos JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Establece la carpeta publica de la web
app.use(express.static('public'));

// Rutas
app.get("/login", (req, res) => {
    let error = "";
    res.render('login', { error });

})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email == "admin@gmail.com" & password == "1234") {
        res.redirect("/juego");
    } else {
        res.render('login', { error: 'Usuario o password incorrecta' });
    }
})

app.get("/juego", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'juego.html'));
})

app.get("/register", (req, res) => {
    let error="";
    res.render("register",{error});
})

app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    let ususario = new User({name,email,password});
    try {
        await usuario.save();
        res.redirect("/login");
    } catch (error) {
        res.render("register",{error});
    }
});



// Configuración de Socket.io
/*
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
*/


// Configuración del puerto y inicio del servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
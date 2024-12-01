const express = require('express')
const connection = require('../connection')
const router = express.Router();

router.post('/comanda', (req, res) => {
    let comanda = req.body;
    let query = 'Insert Into comanda(idComanda,idMesero,formaPago,propina,total) value(?,?,?,?,?)'
    connection.query(query, [
        comanda.idComanda,
        comanda.idMesero,
        comanda.formaPago,
        comanda.propina,
        comanda.total],
        (err) => {
            if (!err) {
                return res.status(200).json({ message: "Succesfully" });
            } else {
                return res.status(400).json(err);
            }
        }
    )
});

router.put('/comanda', (req, res) => {
    let comanda = req.body;
    let query = 'update comanda set formaPago = ?, propina = ?, total = ? where idComanda = ?'
    connection.query(query, [
        comanda.formaPago,
        comanda.propina,
        comanda.total,
        comanda.idComanda],
        (err, results) => {
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(400).json(err);
            }
        }
    )
});


router.post('/comandaId', (req,res) => {
    let query = `select a.idComanda,concat(b.nombre, ' ', b.apellido) as nombre,a.formaPago,(a.total*a.propina)/(1+a.propina) as propina,a.total from comanda a
inner join mesero  b on a.idMesero = b.idMesero
where a.idcomanda = ?`
    connection.query(query, req.body.idComanda,
        (err, results) => {
            console.log(results);
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(400).json(err);
            }
        }
    )
});


router.get('/mesero', (req,res) => {
    let query = 'select idMesero,nombre,apellido from Mesero'
    connection.query(query, null,
        (err, results) => {
            console.log(results);
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(400).json(err);
            }
        }
    )
});

router.get('/platillos', (req, res) => {
    let query = 'select idPlatillo,Nombre,Descripcion,Costo from Platillos'
    connection.query(query, null,
        (err, results) => {
            console.log(results);
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(400).json(err);
            }
        }
    )
});

router.get('/bebidas', (req, res) => {
    let query = 'select idBebida,Nombre,Descripcion,Costo from Bebidas'
    connection.query(query, null,
        (err, results) => {
            console.log(results);
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(400).json(err);
            }
        }
    )
});

router.get('/paquete', (req, res) => {
    let query = 'select idPaquete,Nombre,Descripcion,Costo from Paquete'
    connection.query(query, null,
        (err, results) => {
            console.log(results);
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(400).json(err);
            }
        }
    )
});

router.get('/idComanda', (req, res) => {
    let query = 'SELECT NEXT VALUE FOR seqcomanda AS Secuencia'
    connection.query(query, null,
        (err, results) => {
            console.log(results);
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(400).json(err);
            }
        }
    )
});


router.post('/obtenerTicket', (req, res) => {
    let obtenerTicket = req.body;
    let query = `
    Select SUM(t.subtotal) subtotal FROM (
	SELECT (Costo * Cantidad) subtotal from Comanda a
    inner join ComandaPlatillos b on a.idComanda = b.idComanda
    inner join platillos c on c.idPlatillo = b.idPlatillo
    WHERE a.idComanda = ?
    union all
    SELECT (Costo * Cantidad) subtotal from comanda a
    inner join ComandaBebidas b on a.idComanda = b.idComanda
    inner join Bebidas c on c.idBebida = b.idBebida
    WHERE a.idComanda = ?
    union all
    SELECT (Costo * Cantidad) subtotal from comanda d
    inner join ComandaPaquete e on d.idComanda = e.idComanda
    inner join paquete f on e.idPaquete=f.idPaquete
    WHERE d.idComanda = ?
    ) t`
    connection.query(query, [
        obtenerTicket.idComanda,
        obtenerTicket.idComanda,
        obtenerTicket.idComanda
    ],
        (err, results) => {
            console.log(results);
            if (!err) {
                return res.status(200).json(results);
            } else {
                return res.status(400).json(err);
            }
        }
    )
})



router.post('/ComandaPlatillos', (req, res) => {
    let ComandaPlatillos = req.body;
    let query = 'insert into ComandaPlatillos (idPlatillo,idComanda,cantidad) value(?,?,?)'
    connection.query(query, [
        ComandaPlatillos.idPlatillo,
        ComandaPlatillos.idComanda,
        ComandaPlatillos.cantidad],
        (err) => {
            if (!err) {
                return res.status(200).json({ message: "Succesfully" });
            } else {
                return res.status(400).json(err);
            }
        }
    )
});

router.post('/ComandaBebidas', (req, res) => {
    let ComandaBebidas = req.body;
    let query = 'insert into ComandaBebidas (idBebida,idComanda,cantidad) value(?,?,?)'
    connection.query(query, [
        ComandaBebidas.idBebida,
        ComandaBebidas.idComanda,
        ComandaBebidas.cantidad],
        (err) => {
            if (!err) {
                return res.status(200).json({ message: "Succesfully" });
            } else {
                return res.status(400).json(err);
            }
        }
    )
});

router.post('/ComandaPaquetes', (req, res) => {
    let ComandaPaquete = req.body;
    let query = 'insert into ComandaPaquete (idPaquete,idComanda,cantidad) value(?,?,?)'
    connection.query(query, [
        ComandaPaquete.idPaquete,
        ComandaPaquete.idComanda,
        ComandaPaquete.cantidad],
        (err) => {
            if (!err) {
                return res.status(200).json({ message: "Succesfully" });
            } else {
                return res.status(400).json(err);
            }
        }
    )
});

module.exports = router;

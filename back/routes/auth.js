const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ethers = require('ethers');
const cookieParser = require('cookie-parser');

module.exports = router;
// primera invocacion login
router.get('/login/:address', (req, res) => {
    const token = createJWT({ address: req.params.address })
    res.send(token)
})

router.get('/ping', (req, res) => {
    res.send('pong')
})

function verifyJWT(req, res, next) {
    const token = req.headers['autorization'].split(' ')[1]
    if (!token) {
        res.status(401).send('No autorizado')
        return
    }
    const decoded = jwt.verify(token, process.env.KEY)
    if (!decoded) {
        res.status(401).send('No autorizado')
        return
    }
    req.token = token
    req.decoded = decoded
    next()
}

// seunda invocacion login
router.get('/login/:address/:signature', [verifyJWT], async (req, res) => {
    if (req.decoded.address == req.params.address) {
        // valido que la signature sea correcta
        
        const cuenta = ethers.verifyMessage(req.token, req.params.signature)
        // firma correcta y cuenta correcta
        if (cuenta.toUpperCase() == req.params.address.toString().toUpperCase()) {
            const tokenOutput = createJWT({ address: req.params.address })
            res.send(tokenOutput)
            return

        } else {
            res.status(401).send('Firma incorrecta')
        }
    } else {
        res.status(401).send('No autorizado')
    }
})



// 
function createJWT(datos) {
    return jwt.sign(datos, process.env.KEY)
}


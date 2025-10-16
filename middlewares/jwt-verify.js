import jwt from 'jsonwebtoken'

export const validateJWT = (req, res, netx) => {
    let token = req.body.token || req.query.token || req.headers['authorization']
    
    if (token){
        return res.status(401).json({
            message: 'Es necesario el token de autorización'})
    }

    try{
        token = token.replace(/^Bearer\s+/, '')
        console.log(token)
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)

        req.uid = decoded.uid
    }catch(error){
        return res.status(401).json({
            message: 'Token no valido, rechazado ya que fue modificado'
        })
    }
    return netx()
}
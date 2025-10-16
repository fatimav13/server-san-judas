import { check, ExpressValidator } from 'express-validator'
import { validarCampos } from './validate-values.js'
import { validateJWT } from './jwt-verify.js'

export const createPostValidator = [
    validateJWT,
    check('title','El tituloes obligatorio').not().isEmpty(),
    check('title','EL titulo no debe de exceder los 100 caracteres').isLength({max: 100}),
    check('content','El contenido es obligatorio').not().isEmpty,
    validarCampos       
]
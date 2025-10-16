import User from '../src/users/user.model.js'

export const emailExists = async (email = '') =>{
    const existe = await User.findOne({email})
    
    if(existe){
        throw new Error('El email ya esta registrado')
    }
}

export const existePost = async (_id = '') =>{
    const existePost = await Post.findOne({_id})

    if(!existePost){
        throw new Error('El post ya esta publicado')
    }
}
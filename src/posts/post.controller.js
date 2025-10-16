import Post from './post.model.js'
import User from '../users/user.model.js'
import Comment from '../comments/comment.model.js'

export const createPost = async (req, res) =>{
    try{
        const { title, content } = req.body
        const authorId = req.uid
        console.log(authorId)
        const post = await Post.create ({
            title,
            content,
            author: authorId
        })

        await User.findByIdAndUpdate(authorId, {
            $push: { posts: post._id}
        })

        const populatedPost = await Post.findByIdAndUpdate(post._id)
            .populate('author', 'name surname username profilePicture')
            .populate('comments')

        return res.status(200).json({
            message: 'publicación exitosa',
            post: populatedPost
        })
    }catch(error){
        return res.status(500).json({
            message: 'Error al guardar la publicación',
            error: error.message
        })
    }
}

export const getAllPosts = async (req, res) => {
    try{
        const { page = 1, limit = 8 } = req.query
        const skip = (page -1) * limit

        const post = await Post.find()
        .populate('author', 'name surname username profile Picture')
        .populate({
            path: 'author',
            populate:{
            path: 'author',
            select: 'name surname username profilePicture'
            }
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parceInt(limit))

    const totalPosts = await Post.countDocuments()

    return res.status(200).json({
        message: 'Publicaciones optenidas exitosamente',
        posts,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPosts,
            pages: Math.ceil(totalPosts / limit)
        }
    })
    }catch(error){
        return res.status(500).json({
            message: 'Error al obtener las publicaciones',
            error: error.message
        })
    }
}

export const getPostById = async (req, res) => {
    try{
        const  { id } = req.params

        const post = await Post.findById(id)
            .populate('author, name surname profilePicture')
            .populate({
                path: 'comments',
                populate:{
                path: 'aurthor',
                select: 'name surname username profilePicture'
                }
            })

            return res.status(200).json({
                message: ' Publicación obtenida',
                post
            })
    }catch(error){
        return res.status(500).json({
            message: 'Error al obtener las publicaciones',
            error: error.message
        }) 
    }
}
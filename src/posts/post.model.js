import { Schema, model, trusted } from "mongoose";

const postSchema = new Schema({
    title:{
        type: String, 
        required: true,
        trim: true
    },
    content:{
        type: String, 
        required: true,
        trim: trusted
    }, 
    author: {
        type: Schema. Types.ObjectId,
        ref: 'User',
        required: true
    },
     comments: [{
        type: Schema.Types.ObjectIde,
        ref: 'Comment'
    }]
}, {
    timestamps: true, 
    versionKey: false
})

export default model('Post' , postSchema)
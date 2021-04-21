import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    album_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    duracion:{
        type: Number,
        required: true,
    },
    reproducciones:{
        type: Number,
        required: true,
    },
    url:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Track', trackSchema);
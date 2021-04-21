import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    artist_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    genero:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Album', albumSchema);
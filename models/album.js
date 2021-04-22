import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    artist_id:{
        type: String,
        ref: 'Artist',
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    self:{
        type: String,
        required: true,
    },
    tracks:{
        type: String,
        required: true,
    },
    artist:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Album', albumSchema);
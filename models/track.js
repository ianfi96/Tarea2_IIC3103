import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    album_id:{
        type: String,
        ref: 'Album',
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    times_played:{
        type: Number,
        required: true,
    },
    artist:{
        type: String,
        required: true,
    },
    album:{
        type: String,
        required: true,
    },
    self:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Track', trackSchema);
import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    url:{
        type: String,
        required: true,
    },
});

export default mongoose.model('Artist', artistSchema);
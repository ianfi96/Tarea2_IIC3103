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
    self:{
        type: String,
        required: true,
    },
    albums:{
        type: String,
    },
    tracks:{
        type: String,
    },
});

// artistSchema.methods.toJSON = () => {
//     var obj = this.toObject();
//     delete obj._id;
//     delete obj.__v;
// }
export default mongoose.model('Artist', artistSchema);
import dotenv from "dotenv"
import express, {json, urlencoded} from 'express';
import mongoose from 'mongoose';
import artistsRoutes from './routes/artists.js';
import albumsRoutes from './routes/albums.js';
import tracksRoutes from './routes/tracks.js';

dotenv.config();

const app = express();
// mongoose.connect(
//     process.env.DATABASE_URI,
//     { useNewUrlParser: true , useUnifiedTopology: true}
// );
mongoose.connect(
    process.env.DATABASE_URI||'mongodb+srv://ianfi96:2014fischer@virginia-east.ykrvu.mongodb.net/tarea2_db?retryWrites=true&w=majority',
    { useNewUrlParser: true , useUnifiedTopology: true}
);
const db = mongoose.connection;

db.on('error', (error) => {console.log(error)});
db.once('open', ()=>{console.log('Connected to database correctly')});


app.use(express.json());
app.use(express.urlencoded());

app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/tracks', tracksRoutes);

// app.use((error, req, res, next) => {
//     return res.status(500).json({ error: error.toString() });
//   });

app.get('/', (req, res)=>{
    console.log('TEST'),
    res.send('Hello from homepage');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server running on port http//localhost:${PORT}`));

export default app;

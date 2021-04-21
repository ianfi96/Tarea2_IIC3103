import 'dotenv/config.js'
import express, {json, urlencoded} from 'express';
import mongoose from 'mongoose';
import artistsRoutes from './routes/artists.js';
import albumsRoutes from './routes/albums.js';
import tracksRoutes from './routes/tracks.js';

const app = express();
mongoose.connect(
    process.env.DATABASE_URI,
    { useNewUrlParser: true , useUnifiedTopology: true}
);
const db = mongoose.connection;

db.on('error', (error) => {console.log(error)});
db.once('open', ()=>{console.log('Connected to database correctly')});

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/tracks', tracksRoutes);

app.get('/', (req, res)=>{
    console.log('TEST'),
    res.send('Hello from homepage');
});

app.listen(PORT,()=> console.log(`Server running on port http//localhost:${PORT}`))

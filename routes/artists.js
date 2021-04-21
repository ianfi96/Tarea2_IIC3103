import express from 'express';
const router = express.Router();
import Artist from '../models/artist.js';

const artists = [
    {
        "id": "blabalbalabla",
        "nombre": "John",
        "edad": 25,
        "url": "hola"
    }
]

router.get('/', (req, res) => {
    console.log(artists);
});

router.get('/:id', (req, res) => {
    console.log(artists);
});

router.get('/:id/albums', (req, res) => {
    console.log(artists);
});

router.get('/:id/tracks', (req, res) => {
    console.log(artists);
});



router.post('/', async (req,res) => {
    const artist = new Artist({
        id: Buffer.from(req.body.name).toString('base64'),
        name: req.body.nombre,
        age: req.body.age,
        url:'',
    });

    // try{
    //     const newArtist = await artist.save();
    // } catch (err){

    // }

});

router.post('/:id/albums', (req,res) => {

});

router.delete('/:id', (req,res)=>{

});

router.put('/:id/albums/play',(req,res)=>{

});

export default router;
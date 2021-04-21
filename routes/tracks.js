import express from 'express';

const router = express.Router();

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



router.post('/', (req,res) => {

});

router.post('/:id/albums', (req,res) => {

});

router.delete('/:id', (req,res)=>{

});

router.put('/:id/albums/play',)

export default router;
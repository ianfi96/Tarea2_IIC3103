import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
    console.log();
});

router.get('/:id', (req, res) => {
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
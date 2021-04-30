import express from 'express';
import Track from '../models/track.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const allTracks = await Track.find().select('-_id -__v');
        if (allTracks.length != 0) {
            res.status(200).json(allTracks);
        } else {
            res.status(404).json({message: 'No hay canciones'});
        }
    } catch (error) {
        res.status(404).json({message: 'No hay canciones'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const track = await Track.findOne({ id: req.params.id}).select('-_id -__v');
        if (track) {
            return res.status(200).json(track);
        } else{
            return res.status(404).json({message: 'Canción no encontrado'});
        }
    } catch (error) {
        return res.status(404).json({message: 'Canción no encontrado'});
    }
});


router.delete('/:id', async (req,res)=>{
    try {
        const toDeleteTrack = await Track.findOne({id: req.params.id});
        if (toDeleteTrack){
            const deleteTrack = await Track.deleteOne({id: req.params.id});
            return res.status(204).json({message: "Canción eliminada"});
        } else{
            return res.status(404).json({message: "No existe cancion"});
        }
    } catch (error) {
        return res.status(500);
    }
});

router.put('/:id/play', async(req,res) =>{
    try {
        const toPlayTrack = await Track.findOne({id: req.params.id});
        if (toPlayTrack) {
            toPlayTrack.times_played += 1;
            const updateTrack = await toPlayTrack.save();
            return res.status(200).json({message: "canción reproducida"});
        } else {
            return res.status(404).json({message: "canción no encontrada"});
        }
    } catch (error) {
        return res.status(500);
    }
});

router.all((req,res)=>{
    return res.status(405)
})

export default router;
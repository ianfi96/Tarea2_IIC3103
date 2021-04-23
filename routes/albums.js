import express from 'express';
import Album from '../models/album.js';
import Track from '../models/track.js';
import Artist from '../models/artist.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const allAlbums = await Album.find().select('-_id -__v');
        res.status(200).json(allAlbums);
    } catch (error) {
        res.status(404).json({message: 'Error'});
    }
});

//Obtiene un album por id
router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findOne({ id: req.params.id}).select('-_id -__v');
        if (album){
            return res.status(200).json(album);
        } else {
            return res.status(404).json({message: 'Album no encontrado'});
        }
    } catch (error) {
        return res.status(405).json({message: ''});
    }
});

//Obtiene todas las tracks de un album si hay
router.get('/:id/tracks', async (req, res) => {
    try {
        const allTracks = await Track.find({album_id: req.params.id}).select('-_id -__v');
        if (allTracks.length != 0){
            return res.status(200).json(allTracks);
        }else{
            return res.status(404).json({message: 'Album no encontrado'});
        }
    } catch (error) {
        return res.status(500).json({message: 'Album no encontrado'});
    }
});

//Crea una canción en el album
router.post('/:id/tracks', async (req,res) => {
    const new_track_name = req.body.name;
    const new_track_duration = req.body.duration;
    try{
        if (typeof new_track_name != 'string' || Number.isFinite(new_track_duration) == false) {
            return res.status(400).json({message: "input inválido"});
        }
        const new_track_id = Buffer.from(req.body.name + ':' + req.params.id).toString('base64').substring(0,22);
        const track_exists = await Track.findOne({id: new_track_id}).select('-_id -__v');
        const album_exists = await Album.findOne({id: req.params.id}).select('-_id -__v');
        if (!album_exists){
            return res.status(422).json({message: 'No existe el album al que se quiere agregar la cancion'});
        } else if (track_exists){
            return res.status(409).json(track_exists);
        } else {
            const artist_exists = await Artist.findOne({id: album_exists.artist_id});
            const track = await Track.create({
                id: new_track_id,
                album_id: req.params.id,
                name: new_track_name,
                duration: new_track_duration,
                times_played: 0,
                artist:`https://tarea2-ianfischer.herokuapp.com/artists/${artist_exists.id}`,
                album:`https://tarea2-ianfischer.herokuapp.com/albums/${req.params.id}`,
                self:`https://tarea2-ianfischer.herokuapp.com/tracks/${new_track_id}`,
            });
            const newTrack = await track.save();
            const trackToShow = await Track.findOne({id:new_track_id}).select('-_id -__v')
            return res.status(201).json(trackToShow);
        
    }
    } catch(error) {
        res.status(400).json({message:`${error}`});
    }

});

router.delete('/:id', async (req,res)=>{
    try {
        const albumToDelete = await Album.findOne({id: req.params.id});
        if (albumToDelete) {
            const tracksToDelete = await Track.find({album_id:req.params.id});
            if (tracksToDelete.length != 0){
                const deleteTracks = await Track.deleteMany({album_id:req.params.id});
            };
            const deleteAlbum = await Album.deleteOne({id: req.params.id});
            return res.status(204).json({message: "Album eliminado"})
        } else {
            return res.status(404).json({message: "Album no encontrado"});
        }
    } catch (error) {
        return res.status(500);
    }

});
router.put('/:id/tracks/play', async(req,res)=>{
    try {
        const albumToPlay = await Album.findOne({id: req.params.id});
        if (albumToPlay) {
            const tracksToPlay = await Track.find({album_id:req.params.id});
            if (tracksToPlay.length != 0) {
                for (const track of tracksToPlay) {
                    track.times_played += 1;
                    const updateTrack = await track.save();
                };
                return res.status(200).json({message: "canciones de album reproducidas"});
            } else {
                return res.status(404).json({message: "album no tiene canciones"});
            }
            
        } else {
            return res.status(404).json({message: "no existe album"});
        }
    } catch (error) {
        return res.status(500);
    }
})

export default router;
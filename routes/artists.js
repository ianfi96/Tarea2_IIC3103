import express from 'express';
import Artist from '../models/artist.js';
import Album from '../models/album.js';
import Track from '../models/track.js';

const router = express.Router();

//Obtiene todos los artistas
router.get('/', async (req, res) => {
    try {
        const allArtists = await Artist.find().select('-_id -__v');
        res.status(200).json(allArtists);
    } catch (error) {
        res.status(404).json({message: 'No hay artistas en la base de datos'});
    }
});

//Obtiene la ifnromacion de un artista
router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findOne({ id: req.params.id}).select('-_id -__v');
        if (artist){
            return res.status(200).json(artist);
        } else {
            return res.status(404).json({message: 'Artista no encontrado'});
        }
    } catch (error) {
        return res.status(500);
    }
});

//Obtiene todos los albumes de un artista
router.get('/:id/albums', async (req, res) => {
    try {
        const allAlbums = await Album.find({artist_id: req.params.id}).select('-_id -__v');
        if (allAlbums.length != 0) {
            return res.status(200).json(allAlbums);
        } else {
            return res.status(404).json({message: 'Artista no encontrado'});
        }
    } catch (error) {
        return res.status(404).json({message: 'Artista no encontrado'});
    }
});

//Obtiene todas las canciones de un artista
router.get('/:id/tracks', async(req, res) => {
    try {
        const id_artist = req.params.id;
        const allAlbums = await Album.find({artist_id: id_artist}).select('-_id -__v');
        let artist_tracks = [];
        let album_tracks = [];
        if (allAlbums.length != 0) {
            for (const album of allAlbums) {
                album_tracks = await Track.find({album_id: album.id}).select('-_id -__v');
                artist_tracks.push.apply(artist_tracks, album_tracks);
            
            };
            if (artist_tracks.length != 0) {
                return res.status(200).json(artist_tracks);
            } else {
                return res.status(404).json({message: "No se encontraron canciones del artista"});
            }
        } else {
            return res.status(404).json({message: "No se encontraron canciones del artista"});
        }

    } catch (error) { 
        return res.status(404).json({message: "No se encontraron canciones del artista"});
    }
});


//Crea un artista
router.post('/', async (req,res) => {
    const new_name = req.body.name;
    const new_age = req.body.age;
    if (typeof new_name != 'string' || Number.isInteger(new_age)=== false) {
        return res.status(400).json({message: "input inválido"});
    }
    try{
        const new_artist_id = Buffer.from(new_name).toString('base64').substring(0,22);
        const artist_exists = await Artist.findOne({id: new_artist_id}).select('id').lean();
        const artist = await Artist.create({
            id: new_artist_id,
            name: new_name,
            age: new_age,
            self:`https://tarea2-ianfischer.herokuapp.com/artists/${new_artist_id}`,
            albums:`https://tarea2-ianfischer.herokuapp.com/artists/${new_artist_id}/albums`,
            tracks:`https://tarea2-ianfischer.herokuapp.com/artists/${new_artist_id}/tracks`,
        });

        if (artist_exists){
                return res.status(409).json({message: 'Usuario ya existe'});
        } else {
            const newArtist = await artist.save();
            const artistToShow = await Artist.findOne({id: new_artist_id}).select('-_id -__v');
            return res.status(201).json(artistToShow);
        }
    } catch(error) {
        res.status(400).json({message:'input inválido'});
    }
});

//Crear Album para el artista de id: :id
router.post('/:id/albums', async (req,res) => {
    const new_album_name = req.body.name;
    const new_album_genre = req.body.genre;
    try {
        if (typeof new_album_name != 'string' || new_album_genre != 'string') {
            return res.status(400).json({message: "input inválido, algun parametro no es string"});
        }
        const new_album_id = Buffer.from(new_album_name+':'+ req.params.id).toString('base64').substring(0,22);
        const album_exists = await Album.findOne({id: new_album_id}).select('id').lean();
        const album = await Album.create({
            id: new_album_id,
            artist_id: req.params.id,
            name: new_album_name,
            genre: new_album_genre,
            self:`https://tarea2-ianfischer.herokuapp.com/albums/${new_album_id}`,
            tracks:`https://tarea2-ianfischer.herokuapp.com/albums/${new_album_id}/tracks`,
            artist:`https://tarea2-ianfischer.herokuapp.com/artists/${req.params.id}`,
        });
        if (album_exists) {
            return res.status(409).json({message: 'álbum ya existe'});
        } else {
            const artist_exists = await Artist.findOne({id: req.params.id}).select('id').lean();
            if (!artist_exists) {
                return res.status(422).json({message: 'No existe el Artista al que se quiere agregar la cancion'});
            } else {
                const newAlbum = await album.save();
                const albumToShow = await Album.findOne({id: new_album_id}).select('-_id -__v');
                return res.status(201).json(albumToShow);
            }
        }
    } catch (error) {
        res.status(400).json({message:'input inválido'});
    }

});

//Borra un artista
router.delete('/:id', async (req,res)=>{
    try {
        const artistToDelete = await Artist.findOne({id: req.params.id});
        if (artistToDelete) {
            const albumsToDelete = await Album.find({artist_id: artistToDelete.id});
            if (albumsToDelete != 0) {
                for (const album of albumsToDelete) {
                    const tracksToDelete = await Track.find({album_id: album.id});
                    if (tracksToDelete != 0) {
                        const deleteTracks = await Track.deleteMany({album_id: album.id});
                    };
                };
                const deleteAlbum = await Album.deleteOne({id: album.id});
            };
            const deleteArtist = await Artist.deleteOne({id: req.params.id});
            return res.status(204).json({message: "Artista eliminado"});
        } else {
            return res.status(404).json({message: "Artista no encontrado"});
        }
    } catch (error) {
        return res.status(500).send();
    }
});

router.put('/:id/albums/play', async (req,res)=>{
    try {
        const artistToPlay = await Artist.findOne({id: req.params.id});
        if (artistToPlay) {
            const albumsToPlay = await Album.find({artist_id: artistToPlay.id});
            if (albumsToPlay.length != 0) {
                for (const album of albumsToPlay) {
                    let tracksToPlay = await Track.find({album_id: album.id});
                    if (tracksToPlay.length != 0) {
                        for (const track of tracksToPlay) {
                            track.times_played += 1;
                            const updateTrack = await track.save();
                        };
                    }
                };
                return res.status(200).json({message: "todas las canciones del artista fueron reproducidas"});
            };
        } else {
            return res.status(404).json({message: "Artista no encontrado"});
        }
    } catch (error) {
        return res.status(500).send();
    }
});

export default router;
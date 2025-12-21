import { ApiError } from "../lib/apiError.js";
import { asynHandler } from "../lib/asyncHandler.js";
import { Album } from "../model/album.model.js";
import { Song } from "../model/song.model.js";

export const createSong = asynHandler(async (req, res) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({message: 'Please upload all files'})
        }

        const {title, artist, albumId, duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        await song.save()

        // if song belong to any album add song id with album
        if (albumId) {
            await Album.findByIdAndUpdate(albumId,{
                $push:{
                    songs: song._id
                },
            })
        }
        res.status(201).json(song)
    } catch (error) {
        console.log("Error in createSong adminController", error);
        throw new ApiError(500, "Internal server error");
        
    }
})


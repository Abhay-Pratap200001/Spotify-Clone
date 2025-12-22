import { ApiError } from "../lib/apiError.js";
import { asynHandler } from "../lib/asyncHandler.js";
import cloudinary from "../lib/cloudinary.js";
import { Album } from "../model/album.model.js";
import { Song } from "../model/song.model.js";

const uploadToCloudinary = asynHandler(async(file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto'
        })
        return result
    } catch (error) {
        console.log('Failed to upload file in cloudinary error in admincontroller.js in uploadToCloudinary function', error);
        throw new ApiError(500, "Failed to upload file");
    }
})


export const createSong = asynHandler(async (req, res) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {  //accepting files 
            return res.status(400).json({message: 'Please upload all files'})
        }

        const {title, artist, albumId, duration} = req.body //aceepting text 
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        //keeping audio files in cloudinary and then saving into db
        const audioUrl = await uploadToCloudinary(audioFile) 
        const imageUrl = await uploadToCloudinary(imageFile)


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



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


export const deleteSong = asynHandler(async(req, res) =>{
    try {
        const {id} = req.params //accepting id from client and we put name of that {id} because in route we say /songs:id
        const song = await  Song.findById(id)

        // if album is attach to song id pull out song id from album then delete the song
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{song: song._id}
            })
        }

        await Song.findByIdAndDelete(id)
        res.status(200).json({success: true, message: 'Song deleted successfully'})
    } catch (error) {
        console.log('Failed to delete song erro in deletSong funxtion under the admin.controller', error);
    }
})


// ******************************************************************************************************************************//


export const createAlbum = asynHandler(async(req, res) =>{
    try {
        const {title, artist, releaseYear} = req.body
        const {imageFile} = req.file

        const imageUrl = await uploadToCloudinary(imageFile)

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })
        await album.save()
        res.status(200).json(album)
    } catch (error) {
        console.log("Failed to create album erro in creteAlbum function in admin.controller file", error);
        throw new ApiError(500, "Internal server error");
    }
})


export const deleteAlbum  = asynHandler(async(req, res) =>{
    try {
        const {id} = req.params //accepting id from client and we put name of that {id} because in route we say /album:id
        await Song.deleteMany({albumId: id}) //we are saying delet all song which is linked to this album id
        await Album.findByIdAndDelete(id) // delete that specific album
        return res.status(200).json({success: true, message: "Album and related songs deleted successfully"});
    } catch (error) {
        console.log("Failed to delete album erro in deleteAlbum function in admin.controller file", error);
        throw new ApiError(500, "Internal server error");
    }
})





export const checkAdmin = asynHandler(async(req, res) => {
    res.status(200).json({admin:true})
})
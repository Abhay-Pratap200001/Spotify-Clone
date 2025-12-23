import { ApiError } from "../lib/apiError.js";
import { asynHandler } from "../lib/asyncHandler.js";
import { Album } from "../model/album.model.js";


export const getAllAlbums =  asynHandler(async(req, res) => {
    try {
        const albums = await Album.find()
        res.status(200).json(albums)
    } catch (error) {
        console.log("failed to get all albums error in getAllAlbums function in albums.controller file", error);
        throw ApiError(500, 'Internal server error')
    }
})


export const getAlbumById =  asynHandler(async(req, res) => {
    try {
        const {albumId} =  req.params  //accepting albumId from client and we put name of that {albumId} because in route we say /:albumId
        const album = await Album.findById(albumId).populate("songs") //populate automatically take all the songs based on id and put into specific album 
        if (!album) {
            return res.status(400).json({success:false, message:'Album not found'})
        }
        res.status(200).json(album)
    } catch (error) {
        console.log("failed to get album based on id");
        throw new ApiError(500, "Internal server error error in getAlbumById function in albums.controller file", error);   
    }
})
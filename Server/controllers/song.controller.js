import { ApiError } from "../lib/apiError.js";
import { asynHandler } from "../lib/asyncHandler.js";
import { Song } from "../model/song.model.js";

export const getAllSongs = asynHandler(async(req, res) => {
    try {
        const songs = (await Song.find()).toSorted({createdAt: -1})
        res.status(200).json(songs)
    } catch (error) {
        console.log("failed get all songs erro in getAllSongs function in song.controller");
        throw new ApiError(500, "Internal server error");    
    }
})


export const getFeaturedSongs = asynHandler(async(req, res) => {
try {
    //fetching random songs using mongodb aggregate
   const songs = await Song.aggregate([
        {
            $sample:{size:6}
        },
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1
            }
        }
    ])
    res.status(200).json(songs)
} catch (error) {
    console.log("Failed to fetch featuredSongs error in getFeaturedSongs function in  song.controller");
    throw new ApiError(500, "Internal server error");    
}
})



export const getMadeForYouSongs = asynHandler(async(req, res) => {
    try {
    //fetching random songs using mongodb aggregate
   const songs = await Song.aggregate([
        {
            $sample:{size:6}
        },
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1
            }
        }
    ])
    res.status(200).json(songs)
} catch (error) {
    console.log("Failed to fetch featuredSongs error in getFeaturedSongs function in  song.controller");
    throw new ApiError(500, "Internal server error");    
}
})



export const getTrendingSongs = asynHandler(async(req, res) => {
    try {
    //fetching random songs using mongodb aggregate
   const songs = await Song.aggregate([
        {
            $sample:{size:4}
        },
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1
            }
        }
    ])
    res.status(200).json(songs)
} catch (error) {
    console.log("Failed to fetch featuredSongs error in getFeaturedSongs function in  song.controller");
    throw new ApiError(500, "Internal server error");    
}
})





import { ApiError } from "../lib/apiError.js";
import { asynHandler } from "../lib/asyncHandler.js";
import { Album } from "../model/album.model.js";
import { Song } from "../model/song.model.js";
import { User } from "../model/user.model.js";

export const getStat = asynHandler(async(req, res)=>{
    try {
        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {
                    $unionWith:{
                        coll: "albums",
                        pipeline: []
                    }
                },

                {
                    $group: {
                        _id: "$artist",
                    }
                },

                {
                    $count: "count",
                }
            ])
        ])

        res.status(200).json({totalAlbums, totalSongs, totalUsers, totalArtists:uniqueArtists[0]?.count || 0 })
     } catch (error) {
        console.log("Failed to get info for status error in getStat in stat.conroller file", error);
        throw new ApiError(500, "Internal server error");
    }
}) 
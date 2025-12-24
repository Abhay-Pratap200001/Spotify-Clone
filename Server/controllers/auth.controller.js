import { ApiError } from "../lib/apiError.js";
import { asynHandler } from "../lib/asyncHandler.js";
import { User } from "../model/user.model.js";

export const authCallback = asynHandler(async (req, res) => {

  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    const user = await User.findOne({ clerKId: id });

    if (!user) {
        await User.create({
            clerKId: id,
            fullName: `${firstName} ${lastName}`,
            imageUrl
        })
    }
  } catch (error) {
    console.log("Error in auth while sign-in user", error);
    throw new ApiError(500, "Failed to sign-in user");
  }
})




import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUser } from "../controllers/user/getUser.controller.js";
import { getUserPrivate } from "../controllers/user/getUserPrivate.controller.js";
import { updateUserData } from "../controllers/user/updateUserData,controller.js"

import { uploadAvatarToS3 } from "../utils/uploadAvatarToS3.js";
import { updateAvatar } from "../controllers/user/updateAvatar.controller.js";
import { deleteAvatarFromS3 } from "../controllers/user/deleteAvatar.controller.js";
import { getPayoutRecord } from "../controllers/user/getPayoutRecord.controller.js";


const router = express.Router();

// PATH:  /api/user/getuser
router.post("/getuser", getUser);

// PATH:  /api/user/getuserprivate
router.post("/getuserprivate", protectRoute, getUserPrivate);

// PATH:  /api/user/updateuserdata
router.patch("/updateuserdata", protectRoute, updateUserData);


// PATH:  /api/user/getpayoutrecord
router.post("/getpayoutrecord", protectRoute, getPayoutRecord);




// PATH:  /api/user/updateavatar             // multer S3
router.patch("/updateavatar", protectRoute, uploadAvatarToS3, updateAvatar);

// PATH:  /api/user/deleteavatar
router.delete("/deleteavatar", protectRoute, deleteAvatarFromS3);



export default router;
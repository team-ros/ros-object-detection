import express from "express"
const router = express.Router()

import multer from "multer"
import { ImageHandler } from "../../detecor/indext"
const upload = multer({ dest: "/tmp" })

router.put("/", upload.single("file"), async (req, res) => {
    
    const file = req.file
    
    try {
        const imageHandlerResponse = await ImageHandler(file.path)
        console.log("detectionResponse", imageHandlerResponse)
        if(!imageHandlerResponse) return res.json({
            status: false
        })
        return res.json({
            status: true,
            data: imageHandlerResponse
        })
    }
    catch(err) {
        return res.json({
            status: false,
            err
        })
    }
    

})

export default router
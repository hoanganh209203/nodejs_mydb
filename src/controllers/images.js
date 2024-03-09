import cloudinary from "../configs/cloudinaryConfig.js";

export const uploadImages = async (req, res) => {
    try {
        
        const images = req.files.map((file) => file.path);

        const uploadedImages = [];

        for (let image of images) {
            const results = await cloudinary.uploader.upload(image);
           
            uploadedImages.push({
                url: results.secure_url,
                publicId: results.public_id
            })
        }
        return res.status(200).json({
            message: "Upload images successfully uploaded",
            datas: uploadedImages
        })
    } catch (error) {
        return res.status(400).json({
            name: error.name,
            maessage: error.message
        })
    }
}

export const removeImages = async (req, res) => {
    try {
        const publicId = req.params.public_id;
      const results = await cloudinary.uploader.destroy(publicId)
      
        if(results.result === "not found"){
            throw new Error("Delete images failed")
        }
        return res.status(200).json({
            message:"Image deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            name: error.name,
            maessage: error.message
        })
    }
}
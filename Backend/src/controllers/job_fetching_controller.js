import { ApiError } from "../utils/ApiError.js";
import { PostJob } from "../models/postjob_models.js";


const filteredjobs = async (req, res) => {
    try {
        const checkdetails = await PostJob.find();

        res.status(200).json({
            success: true,
            filterdjobs: checkdetails,
        });
    } catch (error) {
        console.error("Error fetching filtered jobs:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch filtered jobs",
            error: error.message,
        });
    }
};
export { filteredjobs };

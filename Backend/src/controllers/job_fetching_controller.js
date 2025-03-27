import { ApiError } from "../utils/ApiError.js";
import { PostJob } from "../models/postjob_models.js";


const filteredjobs = async (req, res) => {
    try {
        const { location, salary, jobtitle, skills, jobtype } = req.body;

        let filter = {};

        // Match any provided field
        let orConditions = [];

        if (location) orConditions.push({ location: { $regex: location, $options: "i" } });
        if (jobtitle) orConditions.push({ jobtitle: { $regex: jobtitle, $options: "i" } });
        if (jobtype) orConditions.push({ jobtype: { $regex: jobtype, $options: "i" } });
        if (salary) orConditions.push({ salary: { $gte: salary } });
        if (skills && skills.length > 0) orConditions.push({ skills: { $in: skills } });

        if (orConditions.length > 0) {
            filter.$or = orConditions; // Fetch jobs that match at least one condition
        }

        const checkdetails = await PostJob.find(filter);

        res.status(200).json({
            success: true,
            data: checkdetails,
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
export {filteredjobs}
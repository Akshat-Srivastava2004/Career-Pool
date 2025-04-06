import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { jobsekers,loginjobseekers } from "../controllers/job_seekers_controller.js";
import { randomjobsdetails } from "../controllers/job_seekers_controller.js";
import { filteredjobs } from "../controllers/job_fetching_controller.js";
import { logoutUser } from "../controllers/logout_controller.js";
import { feedback } from "../controllers/Feedback_controller.js";
import { updateappliersinpostjob } from "../controllers/postjob_controller.js";

const routerjobseekers=Router();
routerjobseekers.route("/jobseekersregister").post(
    upload.fields([
        {
            name:"resume",
        }
    ]),
    jobsekers
)
routerjobseekers.route("/feedback").post(feedback)
routerjobseekers.route("/jobseekerslogin").post(loginjobseekers)
routerjobseekers.route("/randomjobs").post(randomjobsdetails)
routerjobseekers.route("/fetchfilteredjobs").post(filteredjobs)
routerjobseekers.route("/logoutjobseekers").post(logoutUser)
routerjobseekers.route("/updateapplyforpostjob").post(updateappliersinpostjob)
export default routerjobseekers
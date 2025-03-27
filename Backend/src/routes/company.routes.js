import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { jobsekers, loginjobseekers } from "../controllers/job_seekers_controller.js";
import { postjob } from "../controllers/postjob_controller.js";
const routercompany=Router();

routercompany.route("/jobseekersregister").post(
    upload.fields([
        {
            name:"resume",
        }
    ]),
    jobsekers
)

routercompany.route("/jobseekerslogin").post(loginjobseekers)
routercompany.route("/postjob").post(postjob)

export default routercompany
import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { companyregister, logincompany } from "../controllers/company_controller.js";
import { randomjobsdetails } from "../controllers/job_seekers_controller.js";
import { filteredjobs } from "../controllers/job_fetching_controller.js";

const routerjobseekers=Router();

routerjobseekers.route("/companyregister").post(
    upload.fields([
        {
            name:"logo",
        }  
    ]),
    companyregister
)
routerjobseekers.route("/comapanylogin").post(logincompany)
routerjobseekers.route("/randomjobs").post(randomjobsdetails)
routerjobseekers.route("/fetchfilteredjobs").post(filteredjobs)
export default routerjobseekers
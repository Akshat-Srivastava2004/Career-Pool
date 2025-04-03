import { Router } from "express";

import { getallfeedbacks,Getjobseekersdetails,allcompanydetails, getallcareerdetails, adminregister, adminlogin, deletecompanyanjobseekers } from "../controllers/admin_controller.js";
import { logoutUser } from "../controllers/logout_controller.js";
import { career } from "../controllers/Career_controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const adminrouter=Router();


adminrouter.route("/adminregister").post(adminregister)
adminrouter.route("/adminlogin").post(adminlogin)
adminrouter.route("/getallcareerdetails").get(getallcareerdetails)
adminrouter.route("/career").post(
    upload.fields([
            {
                name:"resume",
            }
        ]),
    career)
adminrouter.route("/getallfeedbacksdetails").get(getallfeedbacks)
adminrouter.route("/allcompanydetails").get(allcompanydetails)
adminrouter.route("/getjobseekersdetails").get(Getjobseekersdetails)
adminrouter.route("/logoutadmin").post(logoutUser)
adminrouter.route("/deletedetails/:type/:id").delete(deletecompanyanjobseekers)
export default adminrouter;

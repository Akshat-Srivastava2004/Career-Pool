import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { postjob } from "../controllers/postjob_controller.js";
import { logoutUser } from "../controllers/logout_controller.js";
import { companyadminpanel, companyregister } from "../controllers/company_controller.js";
import { logincompany } from "../controllers/company_controller.js";
const routercompany=Router();


routercompany.route("/companyregister").post(
    upload.fields([
        {
            name:"logo",
        }  
    ]),
    companyregister
)
routercompany.route("/comapanylogin").post(logincompany)
routercompany.route("/postjob").post(postjob)
routercompany.route("/companyroute").post(logoutUser)
routercompany.route("/companyadminpanel/:id").get(companyadminpanel)
export default routercompany
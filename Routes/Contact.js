import express from "express";
import {
    deleteConatctById,
  getAllConatact,
  getConatactById,
  getContactByUserId,
  newContact,
  updateContactById,
} from "../controllers/conatct.js";
import { isAuthenticate } from "../middleware/Auth.js";
const router = express.Router();

//new Conatct
// @api description ;- creating conatct
// @api url/endpoint :- /api/conatct/new
// @api method :- post
router.post("/new",isAuthenticate,newContact);

//get all conatact
router.get("/", getAllConatact);
//get all conatact By id
router.get("/:id", getConatactById);
//Upadate conatact By id
router.put("/:id",isAuthenticate, updateContactById);
//Delete conatact By id
router.delete("/:id",isAuthenticate,deleteConatctById);

// get user specific contact
router.get("/userid/:id",getContactByUserId);

export default router;

import  express  from "express";
import { verifyToken } from '../utils/VerfiyUser.js';
import { concreate, deletecon, getContent, updatecont } from "../controllers/Content.controller.js";
import { verfiyAdmin } from "../utils/verfiyAdmin.js";


const router = express.Router();

router.post('/Concreate', verifyToken,verfiyAdmin, concreate);
router.get('/getcont', getContent);
router.delete('/deletecont/:contentId',verifyToken,verfiyAdmin,  deletecon);
router.put('/updatecont/:ContentId',verifyToken,verfiyAdmin,  updatecont);

export default router;
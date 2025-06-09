import express from "express";
import dataController from "../controllers/dataController";

const router = express.Router()

router.get("/get-data", dataController.getData);
router.get("/search-by-number", dataController.searchByNumber);

export default router;
import express from "express";
import { downloader, listFiles, uploader } from "../controllers/file.controller";

const router = express.Router();

router.get('/upload-url',uploader );
router.get('/files', listFiles );
router.get('/download-url', downloader );
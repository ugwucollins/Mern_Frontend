import { Router } from "express";
import {
  getHandler,
  postHandler,
  getIdHandler,
  patchHandler,
  putHandler,
  deleteHandler,
} from "../middleWares/controler.js";

const router = Router();

router.route("/").get(getHandler).post(postHandler);

router
  .route("/:id")
  .get(getIdHandler)
  .patch(patchHandler)
  .put(putHandler)
  .delete(deleteHandler);

export default router;

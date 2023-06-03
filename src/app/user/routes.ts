import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.get("/hi", (req, res, next) => {
  try {
    throw new Error("dddd");
  } catch (error) {
    next(error);
  }
});

export default router;

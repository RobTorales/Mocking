import { Router } from "express";
import  getMockingProducts  from "./mock.controller.js";

const mockingRouter = Router();

mockingRouter.get("/", getMockingProducts);

export default mockingRouter;
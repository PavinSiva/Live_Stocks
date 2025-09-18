import express from "express";
import {
  searchStocks,
  getStockDetails,
  getStockQuote,
  getStockCandles,
} from "../controllers/stocks.controller.js";

const router = express.Router();

router.get("/search", searchStocks);


router.get("/:symbol/details", getStockDetails);


router.get("/:symbol/quote", getStockQuote);


router.get("/:symbol/candles", getStockCandles);


export default router;

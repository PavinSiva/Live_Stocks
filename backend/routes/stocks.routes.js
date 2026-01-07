import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  searchStocks,
  getStockDetails,
  getStockQuote,
  getStockCandles,
  getMarketNews,
} from "../controllers/stocks.controller.js";

const router = express.Router();

router.get("/search", searchStocks);


router.get("/:symbol/details", getStockDetails);


router.get("/:symbol/quote" , getStockQuote);


router.get("/:symbol/candles"  , getStockCandles);


router.get("/market" , getMarketNews);


export default router;
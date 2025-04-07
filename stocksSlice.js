import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStockData: [],
  stockData: {},
}

export const StockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setCurrentOrders: (state, action) => {
      const { currentStockData } = action.payload;
      state.currentStockData = currentStockData;
    },
    setStockData: (state, action) => {
      const { stockData } = action.payload;
      state.stockData = stockData;
    }
  }
})

export const { setCurrentOrders, setStockData } = StockSlice.actions;


export default StockSlice.reducer;

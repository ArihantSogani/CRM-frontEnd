import { createSlice } from "@reduxjs/toolkit";
import { get } from "loadsh";

const initialState = {
  data: null,
  id: null,
  casting: null,
  filling: null,
  prePolish: null,
  setting: null,
  finalPolishing: null,
  delivery: null,
  process: "notStarted",
  processCount: 0,
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.id = get(data, "_id");
    },
    setCasting: (state, action) => {
      const { casting } = action.payload;
      state.casting = casting;
    },
    setFilling: (state, action) => {
      const { filling } = action.payload;
      state.filling = filling;
    },
    setPrePolishing: (state, action) => {
      const { prePolish } = action.payload;
      state.prePolish = prePolish;
    },
    setSetting: (state, action) => {
      const { setting } = action.payload;
      state.setting = setting;
    },
    setFinalPolishing: (state, action) => {
      const { finalPolishing } = action.payload;
      state.finalPolishing = finalPolishing;
    },
    setDelivery: (state, action) => {
      const { delivery } = action.payload;
      state.delivery = delivery;
    },
    deleteOrder: (state, action) => {
      state.data = null;
      state.id = null;
    },
    setProcess: (state, action) => {
      const { process } = action.payload;
      state.process = process;
      switch (process) {
        case "casting":
          state.processCount = 1;
          break;
        case "filling":
          state.processCount = 2;
          break;
        case "prePolish":
          state.processCount = 3;
          break;
        case "setting":
          state.processCount = 4;
          break;
        case "finalPolishing":
          state.processCount = 5;
          break;
        default:
          state.processCount = initialState.processCount;
      }
    },
  },
});

export const {
  setOrder,
  deleteOrder,
  setCasting,
  setDelivery,
  setFilling,
  setFinalPolishing,
  setPrePolishing,
  setProcess,
  setSetting,
} = OrderSlice.actions;

export default OrderSlice.reducer;

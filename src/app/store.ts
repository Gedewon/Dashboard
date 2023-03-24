import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice";
import whiteLabelSlice from "../features/whitelabel/whitelabelSlice";
export const store = configureStore({
  reducer: {
    product: productSlice,
    whiteLabel: whiteLabelSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

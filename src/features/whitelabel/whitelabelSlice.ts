import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface WhiteLabelState {
  id: number;
  logo: string;
  mainColor: string;
  hasUserSection: boolean;
}

const initialState: WhiteLabelState = {
  id: 0,
  logo: "",
  mainColor: "",
  hasUserSection: false,
};

export const WhiteLabelAsync = createAsyncThunk(
  "whiteLabel/fetchWhiteLabel",
  async () => {
    const response = await fetch(
      `https://api-test.innoloft.com/configuration/${process.env.APP_ID || 1}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
    return data;
  }
);

export const WhiteLabelStateSlice = createSlice({
  name: "whiteLabel",
  initialState,
  reducers: {
    setWhiteLabel: (state, action) => {
      state.id = action.payload.id;
      state.logo = action.payload.logo;
      state.mainColor = action.payload.mainColor;
      state.hasUserSection = action.payload.hasUserSection;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(WhiteLabelAsync.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.logo = action.payload.logo;
      state.mainColor = action.payload.mainColor;
      state.hasUserSection = action.payload.hasUserSection;
    });
  },
});

export const { setWhiteLabel } = WhiteLabelStateSlice.actions;

export default WhiteLabelStateSlice.reducer;

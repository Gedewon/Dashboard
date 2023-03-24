import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Better not to infer from return type of fetch call.
export interface ProductRtn {
  id: number;
  name: string;
  description: string;
  picture: string;
  type: {
    id: number;
    name: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
  implementationEffortText: unknown;
  investmentEffort: string;
  trl: {
    id: number;
    name: string;
  };
  video: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    sex: number;
    profilePicture: string;
    position: string;
  };
  company: {
    name: string;
    logo: string;
    address: {
      country: {
        name: string;
      };
      city: {
        name: string;
      };
      street: string;
      house: string;
      zipCode: string;
      longitude: string;
      latitude: string;
    };
  };
  businessModels: {
    id: number;
    name: string;
  }[];
}

export interface ProductState {
  value: ProductRtn;
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  value: {
    id: -1,
    name: "",
    description: "",
    picture: "",
    type: {
      id: -1,
      name: "",
    },
    categories: [
      {
        id: -1,
        name: "",
      },
    ],
    implementationEffortText: null,
    investmentEffort: "",
    trl: {
      id: -1,
      name: "",
    },
    video: "",
    user: {
      id: -1,
      email: "",
      firstName: "",
      lastName: "",
      sex: -1,
      profilePicture: "",
      position: "",
    },
    company: {
      name: "",
      logo: "",
      address: {
        country: {
          name: "",
        },
        city: {
          name: "",
        },
        street: "",
        house: "",
        zipCode: "",
        longitude: "",
        latitude: "",
      },
    },
    businessModels: [
      {
        id: -1,
        name: "",
      },
    ],
  },
  status: "idle",
};

const BASE_URL = "https://api-test.innoloft.com/" as const;

export const incrementAsync = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await fetch(`${BASE_URL}product/6781/`);
    const data = response.json();
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);

export const saveProductAsync = createAsyncThunk(
  "product/saveProduct",
  async (product: Partial<ProductRtn>) => {
    const response = await fetch(`${BASE_URL}product/6781/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = response.json();
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);

export const productSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(saveProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export default productSlice.reducer;

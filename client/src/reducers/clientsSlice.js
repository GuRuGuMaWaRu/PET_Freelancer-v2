import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClients = createAsyncThunk(
  "clients/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/clients");
      return res.data.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createClient = createAsyncThunk(
  "clients/createOne",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/clients", { name: data });

      return res.data.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const clientsAdapter = createEntityAdapter({
  selectId: client => client._id
});

const initialState = clientsAdapter.getInitialState({ loading: false });

export const slice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchClients.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      clientsAdapter.addMany(state, action.payload);
      state.loading = false;
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      clientsAdapter.addOne(state, action.payload);
    });
  }
});

export const { selectAll: selectAllClients } = clientsAdapter.getSelectors(
  state => state.clients
);

export default slice.reducer;

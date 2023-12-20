import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  RevenueInYear,
  TopLessees,
  TopLessors,
  TotalProfit,
  TotalUsers,
  TotalVehicles,
  TotalViews,
  TotalViewsInMonth,
} from "../../app/models/Chart";
import agent from "../../app/api/agent";

interface FilterState {
  totalVehicles: TotalVehicles | null;
  totalVehiclesLoading: boolean;
  totalViews: TotalViews | null;
  totalViewsLoading: boolean;
  totalUsers: TotalUsers | null;
  totalUsersLoading: boolean;
  totalProfits: TotalProfit | null;
  totalProfitsLoading: boolean;
  topLessees: TopLessees[];
  topLesseesLoading: boolean;
  topLessors: TopLessors[];
  topLessorsLoading: boolean;
  revenueInYear: RevenueInYear | null;
  revenueInYearLoading: boolean;
  totalViewsInMonth: TotalViewsInMonth | null;
  totalViewsInMonthLoading: boolean;
}

const initialState: FilterState = {
  totalVehicles: null,
  totalVehiclesLoading: false,
  totalViews: null,
  totalViewsLoading: false,
  totalUsers: null,
  totalUsersLoading: false,
  totalProfits: null,
  totalProfitsLoading: false,
  topLessees: [],
  topLesseesLoading: false,
  topLessors: [],
  topLessorsLoading: false,
  revenueInYear: null,
  revenueInYearLoading: false,
  totalViewsInMonth: null,
  totalViewsInMonthLoading: false,
};

export const getTotalVehiclesAsync = createAsyncThunk<TotalVehicles>(
  "dashboard/getTotalVehiclesAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Chart.totalVehicles();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getTotalViewsAsync = createAsyncThunk<TotalViews>(
  "dashboard/getTotalViewsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Chart.totalViews();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getTotalUsersAsync = createAsyncThunk<TotalUsers>(
  "dashboard/getTotalUsersAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Chart.totalUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getTotalProfitsAsync = createAsyncThunk<TotalProfit>(
  "dashboard/getTotalProfitsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Chart.totalProfit();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getTopLesseesAsync = createAsyncThunk<TopLessees[]>(
  "dashboard/getTopLesseesAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Chart.topLessees();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getTopLessorsAsync = createAsyncThunk<TopLessors[]>(
  "dashboard/getTopLessorsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Chart.topLessors();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getRevenueInYearAsync = createAsyncThunk<RevenueInYear, string>(
  "dashboard/getRevenueInYearAsync",
  async (year: string, thunkAPI) => {
    try {
      const response = await agent.Chart.revenueInYear(year);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getTotalViewsInMonthAsync = createAsyncThunk<
  TotalViewsInMonth,
  { year: number; month: number }
>("dashboard/getTotalViewsInMonthAsync", async (date, thunkAPI) => {
  try {
    const response = await agent.Chart.totalViewsOfMonth(date.year, date.month);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: (error as any).data });
  }
});

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalVehiclesAsync.pending, (state, action) => {
        state.totalVehiclesLoading = true;
      })
      .addCase(getTotalVehiclesAsync.fulfilled, (state, action) => {
        state.totalVehiclesLoading = false;
        state.totalVehicles = action.payload;
      })
      .addCase(getTotalVehiclesAsync.rejected, (state, action) => {
        console.log("Get total vehicles fail");
      });

      builder
      .addCase(getTotalViewsAsync.pending, (state, action) => {
        state.totalViewsLoading = true;
      })
      .addCase(getTotalViewsAsync.fulfilled, (state, action) => {
        state.totalViewsLoading = false;
        state.totalViews = action.payload;
      })
      .addCase(getTotalViewsAsync.rejected, (state, action) => {
        console.log("Get total vehicles fail");
      });

    builder
      .addCase(getTotalUsersAsync.pending, (state, action) => {
        state.totalUsersLoading = true;
      })
      .addCase(getTotalUsersAsync.fulfilled, (state, action) => {
        state.totalUsersLoading = false;
        state.totalUsers = action.payload;
      })
      .addCase(getTotalUsersAsync.rejected, (state, action) => {
        console.log("Get total users fail");
      });

    builder
      .addCase(getTotalProfitsAsync.pending, (state, action) => {
        state.totalProfitsLoading = true;
      })
      .addCase(getTotalProfitsAsync.fulfilled, (state, action) => {
        state.totalProfitsLoading = false;
        state.totalProfits = action.payload;
      })
      .addCase(getTotalProfitsAsync.rejected, (state, action) => {
        console.log("Get total profits fail");
      });

    builder
      .addCase(getTopLesseesAsync.pending, (state, action) => {
        state.topLesseesLoading = true;
      })
      .addCase(getTopLesseesAsync.fulfilled, (state, action) => {
        state.topLesseesLoading = false;
        state.topLessees = action.payload;
      })
      .addCase(getTopLesseesAsync.rejected, (state, action) => {
        console.log("Get top lessees fail");
      });

    builder
      .addCase(getTopLessorsAsync.pending, (state, action) => {
        state.topLessorsLoading = true;
      })
      .addCase(getTopLessorsAsync.fulfilled, (state, action) => {
        state.topLessorsLoading = false;
        state.topLessors = action.payload;
      })
      .addCase(getTopLessorsAsync.rejected, (state, action) => {
        console.log("Get top lessors fail");
      });

    builder
      .addCase(getRevenueInYearAsync.pending, (state, action) => {
        state.revenueInYearLoading = true;
      })
      .addCase(getRevenueInYearAsync.fulfilled, (state, action) => {
        state.revenueInYearLoading = false;
        state.revenueInYear = action.payload;
      })
      .addCase(getRevenueInYearAsync.rejected, (state, action) => {
        console.log("Get revenue in year fail");
      });

    builder
      .addCase(getTotalViewsInMonthAsync.pending, (state, action) => {
        state.totalViewsInMonthLoading = true;
      })
      .addCase(getTotalViewsInMonthAsync.fulfilled, (state, action) => {
        state.totalViewsInMonthLoading = false;
        state.totalViewsInMonth = action.payload;
      })
      .addCase(getTotalViewsInMonthAsync.rejected, (state, action) => {
        console.log("Get total views in month fail");
      });
  },
});

export const {} = DashboardSlice.actions;

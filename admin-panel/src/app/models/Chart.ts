export interface TotalVehicles {
  totalVehicles: number;
  percentageIncreaseByLastWeek: number;
}

export interface TotalUsers {
  totalUsers: number;
  percentageIncreaseByLastWeek: number;
}

export interface TotalProfit {
  totalProfits: number;
  percentageIncreaseByLastWeek: number;
}

export interface TopLessees {
  username: string;
  fullName: string;
  avatar: string;
  totalTripRequested: number;
  totalSpent: number;
}

export interface TopLessors {
  username: string;
  fullName: string;
  avatar: string;
  totalAmmountVehiclesForRent: number;
  profits: number;
}

export interface RevenueInYear {
  TotalRevenue: {
    totalRevenue: {
      year: number;
      months: MonthsInYear;
    };
  };
  totalRentedAndCompletedVehicles: {
    totalCompletedTrip: {
      year: number;
      months: MonthsInYear;
    };
  };
}

export interface MonthsInYear {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

export interface TotalViewsInMonth {
  totalViews: {
    year: number;
    months: number;
    days: {};
  };
}

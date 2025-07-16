import moment from "moment";
import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    Icon: LuLayoutDashboard,
    path: "/home",
  },
  {
    id: "02",
    label: "Income",
    Icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    Icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "04",
    label: "Logout",
    Icon: LuLogOut,
    path: "/logout",
  },
];

export const prepareDataForExpenseChart = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};
export const prepareDataForImportChart = (data = []) => {
  const chartData = data.map((item) => ({
    source: item?.source,
    amount: item?.amount,
  }));
  return chartData;
};
export const prepareIncomeChart2 = (data = []) => {
  const chartData = data.map((item) => ({
    month:moment(item?.date).format("Do MMM"),
    source: item?.source,
    amount: item?.amount,
  }));
  return chartData;
};

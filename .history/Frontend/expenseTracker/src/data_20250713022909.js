import {
    LuLayoutDashboard,LuHandCoins,LuWalletMinimal,LuLogOut
} from "react-icons/lu"

export const SIDE_MENU_DATA = [
{
    id:"01",
    label:"Dashboard",
    Icon:LuLayoutDashboard,
    path:"/dashboard"
},  
{
    id:"02",
    label:"Income",
    Icon:LuWalletMinimal,
    path:"/income"
},  
{
    id:"03",
    label:"Expeort",
    Icon:LuHandCoins,
    path:"/export"
},  
{
    id:"04",
    label:"Logout",
    Icon:LuLogOut,
    path:"/logout"
},  
]

export const prepareDataForExpenseChart = (data = []) => {
    const chartData = data.map((item) => ({
category:item?.category
am
    }))
}
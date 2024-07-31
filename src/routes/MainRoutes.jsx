import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import UserLogin from "../pages/auth/UserLogin";
import CountryTabs from "../pages/Basepage";
import CreateCampaign from "../pages/Campaigns/CreateCampaign";
import CreateTemplate from "../pages/Campaigns/CreateTemplate";
import EmailCampaign from "../pages/Campaigns/EmailCampaign";
import EmailTemplate from "../pages/Campaigns/EmailTemplate";
import Customers from "../pages/Customers/Customers";
import CrmComponent from "../pages/Dashboard/CRM";
import Error from "../pages/Error/Error";
import Feedback from "../pages/Feedback/Feedback";
import PromotionsCreate from "../pages/Promotions/PromotionImage";
import Promotions from "../pages/Promotions/Promotions";
import Reports from "../pages/Reports/Reports";
import PointsSetup from "../pages/Rewards/PointsSetup";
import PointsTable from "../pages/Rewards/PointsTable";
import RewardsSetup from "../pages/Rewards/RewardsSetup";
import RewardsTable from "../pages/Rewards/RewardsTable";

const MainRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    const routes = [
        { path: "/dashboard", component: <CrmComponent /> },
        { path: "/customers", component: <Customers /> },
        { path: "/loyalty ads", component: <Promotions /> },
        { path: "/Campaigns/E-mailTemplate", component: <EmailTemplate /> },
        { path: "/Campaigns/E-mailCampaign", component: <EmailCampaign /> },
        { path: "/campaigns/createTemplate", component: <CreateTemplate /> },
        { path: "/campaigns/createCampaign", component: <CreateCampaign /> },
        { path: "/rewards/rewards-setup", component: <RewardsTable /> },
        { path: "/rewards", component: <RewardsTable /> },
        { path: "/rewards/create-rewards-setup", component: <RewardsSetup /> },
        { path: "/rewards/points-setup", component: <PointsTable /> },
        { path: "/rewards/create-points-setup", component: <PointsSetup /> },
        { path: "/settings", component: <CountryTabs /> },
        { path: "/reports", component: <Reports /> },
        { path: "/feedback settings", component: <Feedback /> },
        {
            path: "/promotions/create-promotions",
            component: <PromotionsCreate />,
        },
    ];

    if (!isLoggedIn) {
        return (
            <Routes>
                <Route path="/" element={<UserLogin />} />
                <Route path="*" element={<Error />} />
            </Routes>
        );
    }

    // if (
    //     permissions.some((permissionArray) =>
    //         permissionArray.some(
    //             (access) => access.Permissions_status === "ALL"
    //         )
    //     ) &&
    //     isLoggedIn
    // ) {
    //     return (
    //         <Routes>
    //             {routes.map((route, index) => (
    //                 <Route
    //                     key={index}
    //                     path={route.path}
    //                     element={route.component}
    //                 />
    //             ))}
    //             <Route path="*" element={<Error />} />
    //         </Routes>
    //     );
    // }

    // const filteredRoutes = routes.filter((route) =>
    //     permissions.some((permissionArray) =>
    //         permissionArray.some(
    //             (access) =>
    //                 access.Permissions_status.charAt(0).toUpperCase() +
    //                     access.Permissions_status.slice(1).toLowerCase() ===
    //                 route.path.split("/")[1]
    //         )
    //     )
    // );

    if (isLoggedIn) {
        return (
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.component}
                    />
                ))}
                <Route path="*" element={<Error />} />
            </Routes>
        );
    }
};

export default MainRoutes;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/view/dashboard/Dashboard";
import Tests from "../components/view/tests/Tests";
import Projects from "../components/view/franchise/Projects";
import AddProject from "../components/view/franchise/AddProject";
import UserPlanTable from "../components/view/franchise/tabs/UserPlanTable";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "/tests", element: <Tests /> },
            { path: "/projects", element: <Projects /> },
            { path: "/projects/addproject", element: <AddProject /> },
            { path: "/projects/addproject/userplantable", element: <UserPlanTable /> },
        ],
    }
]);

import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AllUserTable from "../../Components/UserComponents/AllUsertable/AllUserTable";
import AllUserTabs from "../../Components/UserComponents/AllUsertable/AllUserTabs";
import SideBar from "../../Layouts/SideBar";

function User() {
    const [value, setValue] = useState("one");
    const navigate = useNavigate();
    const handleValue = (value) => {
        setValue(value);
    };
    return (
        <SideBar>
            <AllUserTabs handleValue={handleValue} value={value} />
            <div
                style={{
                    backgroundColor: "#FAFBFC",
                    fontFamily: "poppins",
                    minHeight: "calc(100dvh - 115px)",
                }}
            >
                <Box sx={{ width: "98.6%", margin: "0 auto" }}>
                    {value === "one" && <AllUserTable />}
                    {value === "two" && ""}
                    {value === "four" && ""}
                    {value === "five" && ""}
                </Box>
            </div>
        </SideBar>
    );
}

export default User;

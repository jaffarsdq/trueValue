import "./App.css";

import { createTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
    setBorderColor,
    setWhiteColor,
    toggleBaseColor,
    toggleTheme,
} from "./Redux/Slices/ThemeSlice";
import MainRoutes from "./routes/MainRoutes";
import SnackbarNotification from "./Components/CommonComponents/SnackBarNotification";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const darkMode = useSelector((state) => state.themeSlice.darkMode);
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn && location.pathname === "/") {
            navigate("/Dashboard");
        }
    }, [isLoggedIn]);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: "#1976d2",
            },
            secondary: {
                main: "#dc004e",
            },
        },
    });

    const toggleDarkMode = () => {
        //rgba(81, 81, 81, 1)-border
        //#121212
        dispatch(toggleTheme(false));
        if (!darkMode) {
            dispatch(toggleBaseColor("#121212"));
            dispatch(setBorderColor("rgba(81, 81, 81, 1)"));
            dispatch(setWhiteColor("#121212"));
        } else {
            dispatch(toggleBaseColor("#FAFAFB"));
            dispatch(setBorderColor("#E6EBF1"));
            dispatch(setWhiteColor("#FAFAFB"));
        }
    };

    return (
        // <ThemeProvider theme={theme}>
        //     <CssBaseline />
        //     {/* <Button onClick={toggleDarkMode}>
        //         {darkMode ? 'Light Mode' : 'Dark Mode'}
        //     </Button> */}
        // </ThemeProvider>
        <>
            <MainRoutes />
            <SnackbarNotification />
        </>
    );
}

export default App;

import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Typography } from "@material-ui/core"; 

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            Jincrates {new Date().getFullYear()}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<App />} />
                        </Routes>
                    </div>
                    <br />
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </BrowserRouter>
            </div>
        );
    }
}

export default AppRouter;
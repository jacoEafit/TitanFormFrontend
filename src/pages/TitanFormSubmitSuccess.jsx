import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";

export const TitanFormSubmitSuccess = () => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown === 0) {
        window.location.href = "https://titan.com.pa/?srsltid=AfmBOop3XjUqY8fltkrvjq2czzJz9W_wGj0fQA5PmLQ8fhgsBu8BVIm7";;
        return;
        }
        const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "primary",
        }}
        >
        <Paper
            elevation={4}
            sx={{
            p: 4,
            textAlign: "center",
            maxWidth: 400,
            borderRadius: "16px",
            }}
        >
            <Typography variant="h6" gutterBottom>
            Muchas gracias, tus respuestas han sido guardadas y pronto serán revisadas.
            </Typography>
            <Typography variant="body1">
            Serás redirigido a titan en <strong>{countdown}</strong> segundos
            </Typography>
        </Paper>
        </Box>
    );
}
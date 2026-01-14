import { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";


 import styled from "@emotion/styled";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f3f5f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2937",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0b1220",
      paper: "#111827",
    },
    text: {
      primary: "#e5e7eb",
    },
  },
});

// Emotion styled button (используем тему)
const ToggleButton = styled("button")(({ theme }) => ({
  padding: "10px 14px",
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === "dark" ? "#1f2937" : "#f7f7f7",
  color: theme.palette.text.primary,
  cursor: "pointer",
  fontSize: 14,
  transition: "transform 0.06s ease, background 0.2s ease",
  "&:hover": {
    background: theme.palette.mode === "dark" ? "#243244" : "#efefef",
  },
  "&:active": {
    transform: "scale(0.99)",
  },
}));

export default function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container sx={{ py: 6 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom>
            {mode === "light" ? "Light Theme" : "Dark Theme"}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Нажмите кнопку, чтобы переключить тему. Цвета и фон меняются через
            ThemeProvider + createTheme.
          </Typography>

          <ToggleButton onClick={toggleTheme}>
            Switch to {mode === "light" ? "Dark" : "Light"} theme
          </ToggleButton>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
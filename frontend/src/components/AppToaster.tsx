import { Toaster } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

export default function AppToaster() {

  const { theme } = useTheme();

  return (

    <Toaster
      position="top-right"
      toastOptions={{

        duration: 3000,

        style: {
          background:
            theme === "dark"
              ? "#1E293B"
              : "#FFFFFF",

          color:
            theme === "dark"
              ? "#FFFFFF"
              : "#0F172A",

          border:
            theme === "dark"
              ? "1px solid #009DD1"
              : "1px solid #7ED348",

          borderRadius: "12px",
          padding: "12px 16px",

          boxShadow:
            theme === "dark"
              ? "0 10px 25px rgba(0,0,0,0.35)"
              : "0 10px 25px rgba(15,23,42,0.10)",
        },

        success: {

          iconTheme: {
            primary: "#7ED348",
            secondary:
              theme === "dark"
                ? "#FFFFFF"
                : "#0F172A",
          },

        },

        error: {

          iconTheme: {
            primary: "#EF4444",
            secondary:
              theme === "dark"
                ? "#FFFFFF"
                : "#0F172A",
          },

        },

      }}
    />

  );

}
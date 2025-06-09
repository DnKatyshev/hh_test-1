import { Button as MuiButton } from "@mui/material";
import { forwardRef } from "react";
import { useColorScheme } from "@mui/material";
import { navColorStyles } from "@/components/dashboard/layout/vertical/styles";


export const Button = forwardRef(({ text, callback, icon, type, sx }, ref) => {
    const { colorScheme = "light" } = useColorScheme();
    const styles = navColorStyles[colorScheme]["evident"];
  
    return (
      <MuiButton
        sx={{
            ...styles,
            display: 'flex',
            alignItems: 'center',
            columnGap: '5px',
            borderRadius: "8px",
            padding: "10px 18px",
            fontWeight: 500,
            transition: "all 0.3s ease-in-out",
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            color: '#fff'
        }}
        onClick={callback}
        ref={ref}
        type={type}
      >
        {icon && icon}
        {text && text}
      </MuiButton>
    );
  });
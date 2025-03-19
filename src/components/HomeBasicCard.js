import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Dev from "../assets/dev.svg";

export default function HomeBasicCard() {
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 520, margin: "auto", marginTop: "2rem" }}
    >
      <CardContent>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Hi 👋🏻
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <Typography variant="h5" component="div">
              Welcome to Geek-Connect
            </Typography>
            <Typography variant="body2">Love Techno. ❣️</Typography>
          </div>
          <img
            src={Dev}
            style={{ height: "3rem" }}
            alt="Developer working on a laptop"
          />
        </div>
      </CardContent>
    </Card>
  );
}

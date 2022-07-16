import { Typography, Link, Box } from "@mui/material";
import React from "react";
const SocialLinks = () => {
  return (
    <Box>
      <Typography mb={4} variant="body2" textAlign="center" fontWeight="normal">
        Created by{" "}
        <Link
          href="https://github.com/RReiso"
          className="sampleStop"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          RReiso
        </Link>
      </Typography>
    </Box>
  );
};

export default SocialLinks;

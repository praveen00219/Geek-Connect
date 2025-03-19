import React from "react";
import { Avatar, Container, Stack, Typography } from "@mui/material";

const ProfileDetail = ({ detail }) => {
  return (
    <Container sx={{ maxWidth: 520 }}>
      <Stack direction="row" mt={4} mb={4} gap={4}>
        <Avatar
          alt={detail?.firstName}
          src={detail?.image} // DummyJSON uses "image"
          sx={{ width: "16rem", height: "16rem" }}
        />
        <Stack ml={4}>
          <Typography variant="h3">
            {detail?.firstName} {detail?.lastName}
          </Typography>
          <Typography variant="h4">
            {detail?.address?.city}, {detail?.address?.state}
          </Typography>
          <Typography variant="h6">
            Member: {detail?.username}{" "}
            {/* Using username instead of registerDate */}
          </Typography>
          <Typography variant="body1">{detail?.email}</Typography>
          <Typography variant="body1">{detail?.phone}</Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ProfileDetail;

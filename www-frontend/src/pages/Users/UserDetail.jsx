// UserDetail.jsx
import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const UserDetail = ({ selectedUser, onBack }) => {
  return (
    <Box sx={{ marginTop: "64px", padding: "16px" }}>
      <Button onClick={onBack} variant="outlined" sx={{ marginBottom: "16px" }}>
        Back
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h4">
            {selectedUser.first_name} {selectedUser.last_name}
          </Typography>
          <Typography variant="body1">Age: {selectedUser.age}</Typography>
          <Typography variant="body1">Email: {selectedUser.email}</Typography>
          <Typography variant="body1">Handle: {selectedUser.handle}</Typography>
          <Typography variant="body1">Created At: {new Date(selectedUser.created_at).toLocaleDateString()}</Typography>
          <Typography variant="body1">Updated At: {new Date(selectedUser.updated_at).toLocaleDateString()}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetail;

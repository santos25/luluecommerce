import React from "react";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  Divider,
} from "@material-ui/core";

const ListItemComponent = ({
  text,
  image,
  getDataClick,
  avatarClass,
  titleClass,
  variant,
}) => {
  return (
    <>
      <ListItem onClick={() => getDataClick()} button alignItems="center">
        <ListItemAvatar>
          <Avatar
            alt={text}
            variant="rounded"
            className={avatarClass}
            src={`http://${image}`}
          />
        </ListItemAvatar>
        <Box display="flex" width="100%" justifyContent="center">
          <Typography
            className={titleClass ? titleClass : null}
            variant={variant}
          >
            {text}
          </Typography>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default ListItemComponent;

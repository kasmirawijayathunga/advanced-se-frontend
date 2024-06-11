import { CardActions, Collapse, Typography } from "@mui/material"
import { CustomContentProps, SnackbarContent } from "notistack"
import React, { useState } from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, GlassCard } from "./StyledComponents";

interface ReportCompleteProps extends CustomContentProps {
    notification: {
        body: string,
        title: string,
    }
}

export const NotificationSnack = (({ message, notification }:ReportCompleteProps, ref:any) => {
    const [expanded, setExpanded] = useState(false);
  
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
      <SnackbarContent ref={ref} role="alert">
        <GlassCard sx={{ pl:2, width: "100%" }}>
            <CardActions disableSpacing>
                <Typography>{notification.title}</Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse sx={{ display: "flex", flexDirection: "column", pb: 2 }} in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body1">{notification.body}</Typography>
            </Collapse>
        </GlassCard>
      </SnackbarContent>
    )
})
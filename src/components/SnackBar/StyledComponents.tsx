import { Card, IconButton, IconButtonProps, styled } from "@mui/material";

export const GlassCard = styled(Card)(({ theme }) => ({
    background: theme.palette.mode !== 'dark' ? 'rgba(0, 0, 0, 0.10)' : 'rgba(255, 255, 255, 0.10)',
    borderRadius: '8px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    maxWidth: 350,
    margin: "0 auto"
}));

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));
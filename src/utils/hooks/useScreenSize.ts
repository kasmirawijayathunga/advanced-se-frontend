import { useMediaQuery, useTheme } from "@mui/material";

function useScreenSize() {
    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const ltMdScreen = useMediaQuery(theme.breakpoints.down("md"));
    const gtMdScreen = useMediaQuery(theme.breakpoints.up("md"));
    const isXlScreen = useMediaQuery(theme.breakpoints.up("xl"));
    const gtLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

    return {
        isSmScreen,
        isMdScreen: ltMdScreen && !isSmScreen,
        isXlScreen,
        isLgScreen: gtLgScreen && !isXlScreen,
        ltMdScreen,
        gtMdScreen,
        gtLgScreen
    }
}

export default useScreenSize
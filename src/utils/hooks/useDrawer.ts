
import { useStateValue } from "../../store/StateProvider";
import { actionTypes } from "../../store/reducer";

function useDrawer() {
    const [{ drawer },dispatch] = useStateValue();

    const setDrawer = (state:true|false) => {
        dispatch({
            type: actionTypes.SET_DRAWER,
            drawer: state
        });
    }

   return [drawer, setDrawer]
}

export default useDrawer
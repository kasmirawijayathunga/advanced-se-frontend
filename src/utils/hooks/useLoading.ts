
import { useStateValue } from "../../store/StateProvider";
import { actionTypes } from "../../store/reducer";

function useLoading() {
    const [{ loading },dispatch] = useStateValue();

    const setLoading = (state:true|false) => {
        dispatch({
            type: actionTypes.SET_LOADING,
            loading: state
        });
    }

   return [loading, setLoading]
}

export default useLoading
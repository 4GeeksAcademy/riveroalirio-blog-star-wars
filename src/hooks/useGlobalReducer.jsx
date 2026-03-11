import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store";
import { getPeople, getVehicles, getPlanets } from "../services/starWarsApi";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    useEffect(() => {
        getPeople().then(data => dispatch({ type: "set_people", payload: data }));
        getVehicles().then(data => dispatch({ type: "set_vehicles", payload: data }));
        getPlanets().then(data => dispatch({ type: "set_planets", payload: data }));
    }, []);

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext);
    return { dispatch, store };
}

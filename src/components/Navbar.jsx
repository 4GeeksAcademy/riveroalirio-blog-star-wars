import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    const removeFavorite = (fav) => {
        dispatch({ type: "remove_favorite", payload: fav });
    };

    return (
        <nav className="navbar navbar-dark bg-black px-4">
            <Link to="/">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
                    alt="Star Wars"
                    style={{ height: "40px" }}
                />
            </Link>

            <div className="dropdown">
                <button className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
                    Favoritos
                    <span className="badge bg-dark ms-2">{store.favorites.length}</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item text-muted">Sin favoritos aún</li>
                    ) : (
                        store.favorites.map((fav) => (
                            <li key={`${fav.type}-${fav.uid}`} className="dropdown-item d-flex justify-content-between align-items-center">
                                <Link to={`/single/${fav.type}/${fav.uid}`} className="text-dark text-decoration-none">
                                    {fav.name}
                                </Link>
                                <button
                                    className="btn btn-sm btn-outline-danger ms-3"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFavorite(fav);
                                    }}
                                >
                                    🗑
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};

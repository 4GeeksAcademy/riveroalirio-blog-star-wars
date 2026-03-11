import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const CardImage = ({ src, alt }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return <div className="card-img-placeholder">⭐ {alt}</div>;
    }

    return (
        <img
            src={src}
            className="card-img-top"
            alt={alt}
            onError={() => setError(true)}
            style={{ height: "200px", objectFit: "cover", objectPosition: "top" }}
        />
    );
};

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const toggleFavorite = (uid, type, name) => {
        const isFav = store.favorites.some(f => f.uid === uid && f.type === type);
        if (isFav) {
            dispatch({ type: "remove_favorite", payload: { uid, type } });
        } else {
            dispatch({ type: "add_favorite", payload: { uid, type, name } });
        }
    };

    const isFav = (uid, type) => store.favorites.some(f => f.uid === uid && f.type === type);

    const renderCards = (items, type) =>
        items.map((item) => (
            <div key={item.uid} className="card bg-dark text-white me-3" style={{ minWidth: "200px", width: "200px" }}>
                <CardImage src={item.image} alt={item.name} />
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="card-title" style={{ minHeight: "48px" }}>{item.name}</h5>

                        {type === "people" && (
                            <div className="mb-2 small text-secondary">
                                {item.gender && <p className="mb-0">Género: {item.gender}</p>}
                                {item.hair_color && <p className="mb-0">Cabello: {item.hair_color}</p>}
                                {item.eye_color && <p className="mb-0">Ojos: {item.eye_color}</p>}
                            </div>
                        )}

                        {type === "vehicles" && (
                            <div className="mb-2 small text-secondary">
                                {item.model && <p className="mb-0">Modelo: {item.model}</p>}
                                {item.vehicle_class && <p className="mb-0">Clase: {item.vehicle_class}</p>}
                                {item.crew && <p className="mb-0">Tripulación: {item.crew}</p>}
                            </div>
                        )}

                        {type === "planets" && (
                            <div className="mb-2 small text-secondary">
                                {item.climate && <p className="mb-0">Clima: {item.climate}</p>}
                                {item.terrain && <p className="mb-0">Terreno: {item.terrain}</p>}
                                {item.population && <p className="mb-0">Población: {item.population}</p>}
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => navigate(`/single/${type}/${item.uid}`)}
                        >
                            Ver más
                        </button>
                        <button
                            className={`btn btn-sm ${isFav(item.uid, type) ? "btn-warning" : "btn-outline-warning"}`}
                            onClick={() => toggleFavorite(item.uid, type, item.name)}
                        >
                            {isFav(item.uid, type) ? "❤️" : "🤍"}
                        </button>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="container-fluid px-4 py-4 bg-dark min-vh-100 text-white">

            <h2 className="text-warning mb-3">Personajes</h2>
            <div className="d-flex overflow-auto mb-5 pb-2">
                {store.people.length === 0
                    ? <p className="text-muted">Cargando...</p>
                    : renderCards(store.people, "people")}
            </div>

            <h2 className="text-warning mb-3">Vehículos</h2>
            <div className="d-flex overflow-auto mb-5 pb-2">
                {store.vehicles.length === 0
                    ? <p className="text-muted">Cargando...</p>
                    : renderCards(store.vehicles, "vehicles")}
            </div>

            <h2 className="text-warning mb-3">Planetas</h2>
            <div className="d-flex overflow-auto mb-5 pb-2">
                {store.planets.length === 0
                    ? <p className="text-muted">Cargando...</p>
                    : renderCards(store.planets, "planets")}
            </div>

        </div>
    );
};

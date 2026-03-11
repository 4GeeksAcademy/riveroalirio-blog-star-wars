import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
    const { store, dispatch } = useGlobalReducer();
    const { type, uid } = useParams();
    const navigate = useNavigate();

    const getItem = () => {
        if (type === "people") return store.people.find((p) => p.uid === uid);
        if (type === "vehicles") return store.vehicles.find((v) => v.uid === uid);
        if (type === "planets") return store.planets.find((pl) => pl.uid === uid);
        return null;
    };

    const item = getItem();

    const isFavorite = store.favorites.some(
        (fav) => fav.uid === uid && fav.type === type
    );

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "remove_favorite", payload: { uid, type } });
        } else {
            dispatch({ type: "add_favorite", payload: { uid, type, name: item.name } });
        }
    };

    const getFields = () => {
        if (type === "people") return [
            ["Año de nacimiento", item.birth_year],
            ["Género", item.gender],
            ["Altura", item.height],
            ["Peso", item.mass],
            ["Color de cabello", item.hair_color],
            ["Color de ojos", item.eye_color],
        ];
        if (type === "vehicles") return [
            ["Modelo", item.model],
            ["Clase", item.vehicle_class],
            ["Fabricante", item.manufacturer],
            ["Longitud", item.length],
            ["Tripulación", item.crew],
            ["Pasajeros", item.passengers],
        ];
        if (type === "planets") return [
            ["Clima", item.climate],
            ["Terreno", item.terrain],
            ["Población", item.population],
            ["Diámetro", item.diameter],
            ["Gravedad", item.gravity],
            ["Agua superficial", item.surface_water],
        ];
    };

    if (!item) return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="spinner-border text-warning" />
        </div>
    );

    return (
        <div className="bg-dark min-vh-100 py-5 px-4">
            <button className="btn btn-outline-warning mb-4" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <div className="rounded overflow-hidden border border-secondary" style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <div className="row g-0">
                    <div className="col-md-5">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-100 h-100"
                                style={{ objectFit: "cover", minHeight: "350px" }}
                            />
                        ) : (
                            <div className="card-img-placeholder h-100" style={{ minHeight: "350px" }}>
                                ⭐ {item.name}
                            </div>
                        )}
                    </div>

                    <div className="col-md-7 bg-dark p-4 text-white">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <h1 className="text-uppercase fw-bold" style={{ letterSpacing: "0.1rem" }}>
                                {item.name}
                            </h1>
                            <button
                                className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                                onClick={toggleFavorite}
                            >
                                {isFavorite ? "❤️ Guardado" : "🤍 Guardar"}
                            </button>
                        </div>

                        <div className="row mt-3">
                            {getFields().map(([label, value]) => (
                                <div key={label} className="col-6 mb-3">
                                    <p className="text-secondary mb-0 small text-uppercase">{label}</p>
                                    <p className="fw-bold mb-0">{value || "desconocido"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

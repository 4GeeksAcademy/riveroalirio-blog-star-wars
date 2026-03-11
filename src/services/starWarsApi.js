const urlBaseStarWars = "https://www.swapi.tech/api";
const urlBaseImages = "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images";

export async function getPeople() {
    const cached = localStorage.getItem("sw_people");
    if (cached) return JSON.parse(cached);

    try {
        const response = await fetch(`${urlBaseStarWars}/people?page=1&limit=10`);
        const data = await response.json();

        const details = [];
        for (let item of data.results) {
            const res = await fetch(item.url);
            const info = await res.json();
            details.push({
                uid: item.uid,
                ...info.result.properties,
                image: `${urlBaseImages}/people/${item.uid}.jpg`,
            });
        }

        localStorage.setItem("sw_people", JSON.stringify(details));
        return details;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getVehicles() {
    const cached = localStorage.getItem("sw_vehicles");
    if (cached) return JSON.parse(cached);

    try {
        const response = await fetch(`${urlBaseStarWars}/vehicles?page=1&limit=10`);
        const data = await response.json();

        const details = [];
        for (let item of data.results) {
            const res = await fetch(item.url);
            const info = await res.json();
            details.push({
                uid: item.uid,
                ...info.result.properties,
                image: `${urlBaseImages}/vehicles/${item.uid}.jpg`,
            });
        }

        localStorage.setItem("sw_vehicles", JSON.stringify(details));
        return details;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getPlanets() {
    const cached = localStorage.getItem("sw_planets");
    if (cached) return JSON.parse(cached);

    try {
        const response = await fetch(`${urlBaseStarWars}/planets?page=1&limit=10`);
        const data = await response.json();

        const details = [];
        for (let item of data.results) {
            const res = await fetch(item.url);
            const info = await res.json();
            details.push({
                uid: item.uid,
                ...info.result.properties,
                image: `${urlBaseImages}/planets/${item.uid}.jpg`,
            });
        }

        localStorage.setItem("sw_planets", JSON.stringify(details));
        return details;
    } catch (error) {
        console.log(error);
        return [];
    }
}

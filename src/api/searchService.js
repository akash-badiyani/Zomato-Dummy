import http from "./http";
const querystring = require("querystring");

function getCities(query) {
    return http.get("cities?q=" + query, {
        params: { use_users_base_url: true }
    });
}
function getRestaurants(query) {
    const qs = querystring.stringify(query);
    return http.get("search?" + qs, {
        params: { use_users_base_url: true }
    });
}

export default {
    getCities,
    getRestaurants
};

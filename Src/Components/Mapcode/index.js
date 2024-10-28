const axios = require('axios');

async function geocode(address) {
    try {
        const response = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
            params: {
                api_key: process.env.ORS_API_KEY,
                text: address
            }
        });

        const coordinates = response.data.features[0].geometry.coordinates;
        return {
            latitude: coordinates[1],
            longitude: coordinates[0]
        };
    } catch (error) {
        console.error('Error geocoding address:', error);
        throw error;
    }
}


async function calculateRoute(start, end) {
    try {
        const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
            params: {
                api_key: process.env.ORS_API_KEY,
                start: `${start.longitude},${start.latitude}`,
                end: `${end.longitude},${end.latitude}`
            }
        });

        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const routeData = response.data.routes[0];
            return {
                distance: routeData.summary.distance,
                duration: routeData.summary.duration,
                steps: routeData.segments[0].steps
            };
        } else {
            throw new Error('No routes found for the given locations.');
        }
    } catch (error) {
        console.error('Error calculating route:', error);
        throw new Error('Failed to calculate route. Please check the addresses or coordinates.');
    }
}

module.exports = {
    geocode,
    calculateRoute
};

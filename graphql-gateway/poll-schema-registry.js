const {get} = require('lodash');
const request = require('request-promise-native');

exports.getServiceListWithTypeDefs = async () => {
    const services = [
        {
            name: 'service_a',
            version: 'latest',
        },

        {
            name: 'service_b',
            version: 'latest',
        },
    ];

    const serviceTypeDefinitions = await request({
        baseUrl: process.env.SCHEMA_REGISTRY_URL,
        method: 'POST',
        url: '/schema/compose',
        json: true,
    });

    return get(serviceTypeDefinitions, 'data', []).map((schema) => {
        const service = services.find(
            (service) => service.name === schema.name
        );

        if (!service) {
            console.warn(
                `Matching service not found for type definition "${schema.name}"`
            );
        } else {
            console.log(
                `Got ${schema.name} service schema with version ${schema.version}`
            );
        }
        return {
            name: schema.name,
            url: `dynamic://${schema.name}`,
            version: schema.version,
            typeDefs: schema.type_defs,
            typeDefsOriginal: schema.type_defs_original,
            ...(service ? service : {}),
        };
    });
};

const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema, printSchema} = require('graphql');
const request = require('request-promise-native');

const schema = buildSchema(`
  type Query {
    world: String
	hola: String
  }
`);

const root = {
    world: () => {
        return 'World!';
    },
    hola: () => 'Hola!',
};

const graphPort = 6102;

const app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen({port: graphPort}, () => {
    console.log(`🚀 Server ready at http://localhost:${graphPort}`);
});

(async () => {
    try {
        await request({
            timeout: 5000,
            baseUrl: process.env.SCHEMA_REGISTRY_URL,
            url: '/schema/push',
            method: 'POST',
            json: true,
            body: {
                name: 'service_b',
                version: 'latest',
                type_defs: printSchema(schema),
                url: `http://fed-service-b:${graphPort}`,
            },
        });
        console.info('Schema registered successfully!');
    } catch (err) {
        console.error(`Schema registration failed: ${err.message}`);
    }
})();

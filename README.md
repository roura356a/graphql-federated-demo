# graphql-federated-demo

This repo serves as a **learning exercise**
of [pipedrive/graphql-schema-registry](https://github.com/pipedrive/graphql-schema-registry), a schema storage for
**federated** GraphQL Gateway server as alternative to [Apollo Studio](https://studio.apollographql.com).

There is 2 parts for achieving this. First, the **Schema Registry** itself with the **Gateway**, a **MySQL** db and a
**Redis** store. Second, the federated services connecting to the registry and used by the Gateway. For the Registry I'm
using the official Docker Image `pipedrive/graphql-schema-registry`.

## Setup

1. Go into the `/graphql-gateway` folder and run `npm install`.
1. In the root directory, run `docker-compose up -d` and wait until you can see
   the [Registry's UI](http://localhost:3000/).
1. Go into the federated services folders (`/federated-services/service-a` & `/federated-services/service-b`) and
   run `npm install` in both of them.
1. Go into the `/federated-services` folder and run `docker-compose up -d`.

After this, you should be able to see both services (_service_a_ & _service_b_) registered in the **Registry** and you
could start playing with them using the Gateway's built-in [Playground](http://localhost:6100/graphql).

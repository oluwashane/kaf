import { Kafka, logLevel } from "kafkajs";


const client = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
    logLevel: logLevel.ERROR,
})

export default client

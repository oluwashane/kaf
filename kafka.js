import { Kafka, logLevel } from "kafkajs";


const kafka = new Kafka({
    clientId: 'npm-slack-notifier',
    brokers: ['localhost:9092'],
})

export default kafka

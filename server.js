import express from 'express';
import kafka from './kafka.js';
import { messages } from './src/utils/dummy.js';

const producer = kafka.producer()
const admin = kafka.admin()

const main = async () => {
    const topic = 'npm-package-published'
    await admin.connect()
    await producer.connect()

    await admin.createTopics({
        topics: [{topic}],
        waitForLeaders: true
    })

    const app = express();

    app.use(express.json())

    const randomkeyGen = () => Math.round(Math.random(10) * 1000);
    console.log(randomkeyGen())
    app.post('/payment', async (req, res)=> {
        try {
            console.log("request being made")
            // bulkpayment
            let topicMessages = []
            messages.forEach(message => {
                const format = {
                    topic,
                    messages: [{
                        key: JSON.stringify(randomkeyGen()),
                        value: JSON.stringify(message)
                    }]
                }
                topicMessages.push(format)
            })
            
            const response = await producer.sendBatch({ topicMessages });
            console.log('Published message', { response })
        } catch(e) {
            console.error('Error Publishing message', e)
        }
    })

    const PORT = 3000
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

main().catch(error => {
    console.log(error);
    process.exit(1)
})
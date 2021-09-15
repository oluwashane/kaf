import express from 'express';
import createHookReceiver from 'npm-hook-receiver';
import kafka from './kafka.js';

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

    const randomkeyGen = Math.round(Math.random(10) * 1000);
    console.log(randomkeyGen)
    app.post('/payment', async (req, res)=> {
        try {
            console.log("request being made")
            const response = await producer.send({
                topic,
                messages: [{
                    key: JSON.stringify(randomkeyGen),
                    value: JSON.stringify(req.body)
                }]
            })

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
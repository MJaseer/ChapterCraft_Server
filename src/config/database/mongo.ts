import mongoose from "mongoose";

export default () => {

    let count = 0
    const url = process.env.MONGO_URI
    let uri!: string;
    if (url) uri = url

    mongoose.set('strictQuery', false)
    const options = {
        autoIndex: false,
    }

    async function connectWithRetry() {
        await mongoose
            .connect(uri, options).then(() => {
                console.log('Database connected');

            }).catch(() => {
                console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
                setTimeout(connectWithRetry, 5000)
            })
    }
    connectWithRetry()
}
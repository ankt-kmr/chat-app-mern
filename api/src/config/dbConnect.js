const mongoose = require('mongoose');

const dbConnect = async () => {
    try{
    const coonect = await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log(`Connected to MongoDB: ${coonect.connection.host} ${coonect.connection.name}
    `);
    } catch(error){
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = dbConnect;
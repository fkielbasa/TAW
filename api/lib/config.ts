export const config = {
    port: 3100,
    supportedPostCount: 15,
    JwtSecret: "dsfkljsdlifjdskljfds",
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://twwai:KTp5wYwutrLHPLT@cluster0.ooees.mongodb.net/IoT?retryWrites=true&w=majority'
 };
const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "UeeLvuSF93LGo2Pr", 
    //mongoUri: process.env.MONGODB_URI || "mongodb+srv://tibursiasmachado:UeeLvuSF93LGo2Pr@Skeleton.ve4ktrf.mongodb.net/Skeleton?retryWrites=true&w=majority"||
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://codecrew:Fjqh2cFyyIiueaiq@cluster0.aupjkum.mongodb.net/Project1CodeCrew?retryWrites=true&w=majority&appName=Cluster0" ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    }
    export default config
   
   
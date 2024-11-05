import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//Importamos MongooseModule para conectarnos a la BD. 
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

//Usamos el middleware: 
import MiMiddleware from './middleware/miMiddleware';

//Trabajamos con Variables de Entorno: 
//Instalamos: npm install @nestjs/config
//Import ConfigModule, ConfigService
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService], 
    useFactory: async(config:ConfigService) => ({
      uri: config.get<string>("MONGO_URL")
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiMiddleware).forRoutes({path: "*", method: RequestMethod.ALL})
  }
}

//"mongodb+srv://coderhouse69990:coderhouse@cluster0.k8gmho6.mongodb.net/Nest2?retryWrites=true&w=majority&appName=Cluster0"

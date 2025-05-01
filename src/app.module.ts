import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './books/book.module';
import { MovieModule } from './movies/movie.module';
import { SongModule } from './songs/song.module';
import { GameModule } from './games/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<string>('POSTGRES_PORT')
          ? configService.get<number>('POSTGRES_PORT')
          : 5432,
        password: configService.get<string>('POSTGRES_PASSWORD'),
        username: configService.get<string>('POSTGRES_USER'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        migrations: ['dist/migrations/*.js'],
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        ssl: true,
      }),
    }),
    AuthModule,
    UserModule,
    BookModule,
    MovieModule,
    SongModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    JwtService,
    { provide: APP_GUARD, useClass: AuthGuard },
    AppService,
  ],
})
export class AppModule {}

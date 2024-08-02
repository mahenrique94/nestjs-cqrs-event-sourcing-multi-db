import { Module } from '@nestjs/common';
import { TasksModule } from './subdomains/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'events.db',
      name: 'events',
      synchronize: true,
      type: 'sqlite',
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'data.db',
      name: 'data',
      synchronize: true,
      type: 'sqlite',
    }),
    TasksModule,
  ],
})
export class AppModule {}

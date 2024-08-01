import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'local.db',
      synchronize: true,
      type: 'sqlite',
    }),
    TasksModule,
  ],
})
export class AppModule {}

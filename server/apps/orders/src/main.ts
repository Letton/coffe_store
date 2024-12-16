import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  await app.listen(process.env.port ?? 4003);
}
bootstrap();

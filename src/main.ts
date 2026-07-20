import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //As validações globais dos DTOs
  app.useGlobalPipes(new ValidationPipe());

  //Tatamento global de erros
  app.useGlobalFilters(new AllExceptionsFilter());

  //Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('FocusEngine API')
    .setDescription('API de gerenciamento de tarefas do seu sistema')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

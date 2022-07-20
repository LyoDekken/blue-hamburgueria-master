import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TablesModule } from './tables/tables.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ProductsModule, TablesModule, CategoriesModule, OrdersModule, FavoritesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
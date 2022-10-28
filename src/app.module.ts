import { Module } from '@nestjs/common'; 
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategorieModule } from './categorie/categorie.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [AuthModule, PrismaModule, UserModule, ProductModule, CategorieModule, OrderModule],
})
export class AppModule {}

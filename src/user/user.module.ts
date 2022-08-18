import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [AuthController],
	providers: [UserService],
})
export class UserModule {}

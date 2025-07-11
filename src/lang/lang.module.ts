import { Module } from "@nestjs/common";
import { LangService } from "./lang.service";
import { LangController } from "./lang.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Lang, LangSchema } from "./entities/lang.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lang.name,
        schema: LangSchema,
      },
    ]),
  ],
  controllers: [LangController],
  providers: [LangService],
})
export class LangModule {}

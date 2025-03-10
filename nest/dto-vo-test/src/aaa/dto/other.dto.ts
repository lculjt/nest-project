import { IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class OtherDto {
    @IsNotEmpty()
    @MinLength(4)
    xxx: string;

    @IsNotEmpty()
    @IsNumber()
    yyy: number;
}

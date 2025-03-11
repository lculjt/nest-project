import { Contains,IsDate,IsNegative, Min, Max, IsDivisibleBy, IsDateString,ArrayMinSize, IsPositive, ArrayMaxSize, ArrayNotContains, ArrayContains,  IsBoolean, IsInt, IsEmail, IsNumber, IsIn, IsNotEmpty, IsNotIn, IsOptional, IsString, IsArray, IsDefined, IsAlpha, IsAlphanumeric, IsHexColor, IsHSL, IsRgbColor, IsIP, IsPort, IsJSON, ValidateIf, Validate } from "class-validator";
import { MyValidator } from "../my-validator";

export class CreateAaaDto {
    // @IsNotEmpty()    // 不为空 包括 ‘’、undefined、null
    // @IsDefined()     // 不为空 包括 undefined、null
    // @IsOptional()    // 可为空的

    // @IsString()      // 1.为字符串
                        // 2.@IsAlpha() 是否为字母
                        // 3.@IsAlphanumeric() 是否为字母和数字
                        // 4.@Contains('ad') 字符串中是否含有ad
                        // 5.@MinLength(2)
                        // 6.@MaxLength(6)
                        // 7.@Length(2, 6)
    // @IsBoolean()     // 为布尔类型
    // @IsInt()         // 为数字类型 专门用于验证整数
    // @IsNumber()      // 1.为数字类型 用于验证所有数字类型
                        // 2.@IsPositive() 限制为正数
                        // 3.@IsNegative() 限制为负数
                        // 4.@Min(1) 限制最小值
                        // 5.@Max(10) 限制最大值
                        // 6.@IsDivisibleBy(2) 限制为被2整除的数
    // @IsDateString()  // 限制为日期字符串
    // @IsDate()        // 限制为 Date 实例
    // @IsArray()       // 1.限制是否为数组 
                        // 2.@IsInt({each: true}) 限制数组中的每一项为int
                        // 3.@ArrayContains(['aaa']) 限制数组中必须包含 aaa
                        // 4.@ArrayNotContains(['aaa']) 限制数组必须不包含 aaa
                        // 5.@ArrayMinSize(1) 限制数组最小长度  
                        // 6.@ArrayMaxSize(3) 限制数组最大长度
                        // 7.@ArrayUnique() 限制数组元素必须唯一


    // @IsEmail() // 邮箱
    // @IsHexColor() hex color
    // @IsHSL() hsl color
    // @IsRgbColor() rgb color
    // @IsIP() // ip
    // @IsPort() // port
    // @IsJSON() // json

    // @IsIn(['ddd', 'yyyy', 1]) //限制穿参数必须为 ddd、 yyyy
    // @IsNotIn(['aaa', 'yyyy']) // 限制穿参数必须不为 aaa、 yyyy
    aaa: any;

    @ValidateIf(o => o.aaa) // 判断是否有aaa参数再判断bbb
    @IsNotEmpty()
    bbb: any;

    @IsString()
    @Validate(MyValidator, ['111', '222'], {
        message: 'ccc校验失败'
    })
    ccc: any;
}

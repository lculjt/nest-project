import { CreateAaaDto } from "./create-aaa.dto";
import { PartialType, PickType, OmitType, IntersectionType } from '@nestjs/mapped-types';
import { OtherDto } from "./other.dto";

// export class UpdateAaaDto extends PartialType(CreateAaaDto) {

// }

// export class UpdateAaaDto extends PickType(CreateAaaDto, ['age', 'email']) {

// }


// export class UpdateAaaDto extends OmitType(CreateAaaDto, ['name', 'sex']) {

// }

export class UpdateAaaDto extends IntersectionType(CreateAaaDto, OtherDto) {

}
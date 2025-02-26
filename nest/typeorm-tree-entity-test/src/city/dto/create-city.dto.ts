export class CreateCityDto {
    name: string;

    parentId?: number; // 所属的上级城市 ID，0表示为根城市
}

import { IsString, IsNumber, Min, Max, IsLongitude, IsLatLong, IsLatitude } from "class-validator"


export class CreateReportDto {
    @IsString()
    make: string

    @IsString()
    model: string

    @IsNumber()
    @Min(1940)
    @Max(2020)
    year: number

    @IsNumber()
    @Min(0)
    @Max(1000000)
    milage: number

    @IsLongitude()
    lng: number

    @IsLatitude()
    lat: number

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number
}
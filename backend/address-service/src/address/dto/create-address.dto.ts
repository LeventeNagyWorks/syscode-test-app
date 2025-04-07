import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  profileId?: string;
}

import { Optional } from "@nestjs/common";

export class TokenGenerationDto{
    userId: string;
    email: string;
}

export class CreateVerificationDto extends TokenGenerationDto{
    token: string;
    generatedAt: Date;            
}
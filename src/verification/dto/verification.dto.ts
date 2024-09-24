import { Optional } from "@nestjs/common";

export class TokenGenerationDto{

    userId: string;
    email: string;

    @Optional()
    token: string;

    @Optional()
    generatedAt: Date;

    @Optional()
    expiry: Date; 
}
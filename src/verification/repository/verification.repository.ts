import { Repository } from "typeorm";
import { TOKEN_VALIDITY, Verification } from "../entity/verification.entity";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { DbError, TokenError, VerificationErrorMessages } from "../../utils/constants/errors.constant";
import { CreateVerificationDto, TokenGenerationDto } from "../dto/verification.dto";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";

export class VerificationRepository extends Repository<Verification>{
    constructor(
        @InjectRepository(Verification)
        private readonly verificationRepository: Repository<Verification>,
        private readonly configService: ConfigService

    ){
        super(
            verificationRepository.target,
            verificationRepository.manager,
            verificationRepository.queryRunner
        );
    }

    async generateVerificationToken(tokenGenerationDetails: TokenGenerationDto): Promise<Verification>{

        const tokenGenerationTimestamp = new Date();
        let token: string;

        try{
            token = await bcrypt.hash((tokenGenerationTimestamp.toString() + tokenGenerationDetails.userId), Number(process.env.SALT_ROUNDS));
        }
        catch(error){
            console.log(error);
            throw new InternalServerErrorException(TokenError.GENERATION_ERROR)
        }

        try{
            const details: CreateVerificationDto = {
                userId: tokenGenerationDetails.userId,
                email: tokenGenerationDetails.email,
                token: token,
                generatedAt: tokenGenerationTimestamp,                
            };
            const newVerification: Verification = this.verificationRepository.create(details);
            return await this.verificationRepository.save(newVerification);
        }
        catch(error){
            console.log(error);
            throw new InternalServerErrorException(DbError.WRITE_ERROR);
        }
    }

    async verifyToken(token: string): Promise<string>{
        let userId: string;
        console.log(token, "token")

        try{
            const toBeVerified: Verification = await this.verificationRepository.findOneByOrFail({
                token,
            });
            console.log(toBeVerified)

            return toBeVerified.userId;

            // if(verification.expiry < new Date()){
            //     throw new UnauthorizedException(VerificationErrorMessages.TOKEN_EXPIRED)
            // }
        }
        catch(error){
            console.log(error)
            throw new InternalServerErrorException(error.message);
        }
    }
}
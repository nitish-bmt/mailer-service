import { Repository } from "typeorm";
import { TOKEN_VALIDITY, Verification } from "../entity/verification.entity";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { DbError, TokenError, VerificationErrorMessages } from "../../utils/constants/errors.constant";
import { TokenGenerationDto } from "../dto/verification.dto";

export class VerificationRepository{
    constructor(
        private readonly verificationRepository: Repository<Verification>
    ){}

    async generateVerificationToken(newVerification: TokenGenerationDto): Promise<Verification>{

        const time = new Date();
        
        try{
            const token: string = await bcrypt.hash(time.toString() + newVerification.userId);
            newVerification.token = token;
            newVerification.generatedAt = time;
            newVerification.expiry = new Date(Number(time) + TOKEN_VALIDITY);
        }
        catch(error){
            throw new InternalServerErrorException(TokenError.GENERATION_ERROR)
        }

        try{
            const verification: Verification = this.verificationRepository.create(newVerification);
            return await this.verificationRepository.save(verification);
        }
        catch(error){
            throw new InternalServerErrorException(DbError.WRITE_ERROR);
        }
    }

    async verifyToken(token: string): Promise<string>{
        let userId: string;

        try{
            const verification = await this.verificationRepository.findOneBy({
                token: token,
            });

            userId = verification.userId;

            // if(verification.expiry < new Date()){
            //     throw new UnauthorizedException(VerificationErrorMessages.TOKEN_EXPIRED)
            // }
        }
        catch(error){
            throw new InternalServerErrorException(error.message);
        }

        return userId;
    }
}
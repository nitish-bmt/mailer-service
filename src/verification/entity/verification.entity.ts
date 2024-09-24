import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export const TOKEN_VALIDITY = 1500;

@Entity()
export class Verification{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
    })
    userId: string;

    @Column({
        nullable: false,
    })
    token: string;

    @CreateDateColumn()
    generatedAt: Date;

    // @Column({
    //     default: ()=>Date.now()+TOKEN_VALIDITY
    // })
    // expiry: Date; 
}
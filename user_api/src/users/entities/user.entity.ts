import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({"unique": true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    }
}

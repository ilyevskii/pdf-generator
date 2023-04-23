import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'varchar' })
    email!: string;

    @Column({ type: 'varchar', nullable: true })
    firstName?: string | null;

    @Column({ type: 'varchar', nullable: true })
    lastName?: string | null;

    @Column({ type: 'varchar' })
    password!: string;

    @Column({ type: 'varchar', nullable: true })
    image?: string;

    @Column({ type: 'bytea', nullable: true })
    pdf?: Buffer;

}
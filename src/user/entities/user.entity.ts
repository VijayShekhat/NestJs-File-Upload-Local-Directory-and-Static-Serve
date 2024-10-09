import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profilePicture: string;
}

import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { RedisBlock } from './block';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() email: string;

	@Column() password: string;

	@OneToMany(() => RedisBlock, (block) => block.user)
	block: RedisBlock[];

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 8);
	}
}

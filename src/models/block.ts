import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class RedisBlock extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() blockId: string;

	@Column({ nullable: true })
	userId: number;

	@ManyToOne(() => User, (user) => user.block)
	@JoinColumn()
	user: User;
}

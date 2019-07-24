import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Length, MinLength, IsEmail } from 'class-validator';
import { BaseModel, Booking } from 'models';

@Entity('conferences')
export class Conference extends BaseModel {
	@PrimaryGeneratedColumn()
	id: number;
	@Column('text')
	@MinLength(8)
	name: string;
	@Column({ type: 'text', nullable: true})
	intro: string;
	@Column({ type: 'text', nullable: true})
	@MinLength(8)
	title: string;
	@Column({ type: 'text', nullable: true})
	description: string;
	@Column('date')
	start: Date;
	@Column('date')
	end: Date;
	@CreateDateColumn()
	created: Date;
	@UpdateDateColumn()
	updated: Date;
	@OneToMany(type => Booking, booking => booking.conference)
	bookings: Booking[];
}
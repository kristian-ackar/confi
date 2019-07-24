import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Length, MinLength, IsEmail, Matches } from 'class-validator';
import { BaseModel, Conference } from 'models';

@Entity('bookings')
export class Booking extends BaseModel {
	@PrimaryGeneratedColumn()
	id: number;
	@Column('text')
	@MinLength(2)
	firstName: string;
	@Column('text')
	@MinLength(2)
	lastName: string;
	@Column({ type: 'text', nullable: true})
	//@Matches(/[0-9]+{8,10}/)
	phone: string;
	@Column('text')
	@Length(8, 64)
  @IsEmail()
	email: string;
	@CreateDateColumn()
	created: Date;
	@UpdateDateColumn()
	updated: Date;
	@ManyToOne(type => Conference, conference => conference.bookings)
	conference: Conference;
}
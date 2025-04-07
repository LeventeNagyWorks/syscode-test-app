import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses') // Specify the table name to match Liquibase
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;
}

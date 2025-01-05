import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

import {v4 as uuidv4} from 'uuid';

@Entity('task')
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }
}

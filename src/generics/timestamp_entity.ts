/* eslint-disable prettier/prettier */
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
export class timeStampEntity {
  @CreateDateColumn({ update:false})
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}

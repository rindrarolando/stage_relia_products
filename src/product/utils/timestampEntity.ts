import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity {
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

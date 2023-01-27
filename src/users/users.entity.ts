import { Column, Entity, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    @Exclude()
    password: string

    @Column()
    email: string


    @AfterInsert()
    logInsert() {
        console.log("Yangi user qo'shildi", this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log("shu user update bo'ldi", this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log("Shu user o'chirildi", this.id)
    }

}

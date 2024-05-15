import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

async function seed() {

    const alice = await prisma.user.upsert({
        where: { number: "11111111" },
        update: {},
        create: {
            number: '1111111111',
            password: await bcrypt.hash('alice', 10),
            name: 'alice',
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    status: "Success",
                    token: "seedtoken",
                    provider: "HDFC bank",
                    amount: 2000,
                    startTime: new Date()

                }
            },

        }
        })

        
        const bob = await prisma.user.upsert({
            where: { number: '2222222222' },
            update: {},
            create: {
              number: '2222222222',
              password: await bcrypt.hash('bob', 10),
              name: 'bob',
              Balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
              },
              OnRampTransaction: {
                create: {
                  startTime: new Date(),
                  status: "Failure",
                  amount: 2000,
                  token: "token__2",
                  provider: "HDFC Bank",
                },
              },
            },
          })
        }
        seed()
          .then(async () => {
            await prisma.$disconnect()
          })
          .catch(async (e) => {
            await prisma.$disconnect()
            process.exit(1)
          })
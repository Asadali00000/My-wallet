"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";

export async function P2P(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "user not signin"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    console.log("here");

    if (!toUser) {
        return {
            message: "receiver not found"
        }
    }
    try {

        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE `
            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(from)
                }
            });
            if (!fromBalance || fromBalance?.amount < amount) {
                throw new Error("insufficient balance")

            }
            await tx.balance.update({
                where: {
                    userId: Number(from),
                },
                data: {
                    amount: {
                        decrement: amount
                    }


                }

            })
            await tx.p2p.create({

                data: {
                    amount: amount,
                    fromUserId: from,
                    toUserId: toUser.id,
                    timeStamp: new Date()


                }

            })


            await tx.balance.update({
                where: {
                    userId: Number(toUser.id),
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }

            })

        })
    } catch (e) {
        return {
            message: "error in p2p transaction process"
        }

    }


}
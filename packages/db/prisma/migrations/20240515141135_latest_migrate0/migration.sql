-- CreateTable
CREATE TABLE "p2p" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "p2p_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2p" ADD CONSTRAINT "p2p_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2p" ADD CONSTRAINT "p2p_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

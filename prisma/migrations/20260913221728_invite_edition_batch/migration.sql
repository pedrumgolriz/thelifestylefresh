-- AlterTable
ALTER TABLE "HouseConfig" ALTER COLUMN "id" SET DEFAULT 'house';

-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "issuedByEditionId" TEXT;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_issuedByEditionId_fkey" FOREIGN KEY ("issuedByEditionId") REFERENCES "Edition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

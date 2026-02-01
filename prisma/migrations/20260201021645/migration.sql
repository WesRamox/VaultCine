-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('unstaffed', 'staffed', 'blocked', 'frozen', 'completed');

-- CreateEnum
CREATE TYPE "CategoryEnum" AS ENUM ('Розробка', 'Менеджмент', 'Дизайн', 'Маркетинг', 'Інші');

-- CreateEnum
CREATE TYPE "target" AS ENUM ('TRAINEE', 'MENTOR', 'PARTNER');

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "text_review" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "reviewedUserId" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demos" (
    "id" SERIAL NOT NULL,
    "demo_date" TIMESTAMP(3) NOT NULL,
    "demo_time" TEXT NOT NULL,
    "meeting_link" TEXT NOT NULL,
    "demoProjectId" INTEGER NOT NULL,

    CONSTRAINT "demos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "project_name" VARCHAR(100) NOT NULL,
    "project_photo" VARCHAR(100),
    "short_description" VARCHAR(100),
    "description" TEXT,
    "goals" TEXT NOT NULL,
    "project_start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3),
    "projectStatus" "ProjectStatus" NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "links" TEXT[],

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "position_name" VARCHAR(100) NOT NULL,
    "category" "CategoryEnum" NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" SERIAL NOT NULL,
    "sector_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stakeholders" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name_stakeholder" VARCHAR(100) NOT NULL,
    "last_name_stakeholder" VARCHAR(100) NOT NULL,
    "phone_stakeholder" VARCHAR(20) NOT NULL,
    "stakeholder_photo" VARCHAR(255),

    CONSTRAINT "stakeholders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "target" "target" NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "user_photo" VARCHAR(255),
    "linkedin" TEXT,
    "slack" TEXT,
    "telegram" TEXT,
    "schedule_start" TEXT NOT NULL,
    "schedule_end" TEXT NOT NULL,
    "user_start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "growth_plan" TEXT,
    "experience" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "skill_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_project_positions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_project_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DemoToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DemoToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProjectToStakeholder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectToStakeholder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProjectToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectToSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SkillToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SkillToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "projects_project_name_idx" ON "projects"("project_name");

-- CreateIndex
CREATE INDEX "positions_position_name_idx" ON "positions"("position_name");

-- CreateIndex
CREATE INDEX "positions_category_idx" ON "positions"("category");

-- CreateIndex
CREATE UNIQUE INDEX "stakeholders_email_key" ON "stakeholders"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_first_name_idx" ON "users"("first_name");

-- CreateIndex
CREATE INDEX "users_last_name_idx" ON "users"("last_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_project_positions_userId_projectId_positionId_key" ON "user_project_positions"("userId", "projectId", "positionId");

-- CreateIndex
CREATE INDEX "_DemoToUser_B_index" ON "_DemoToUser"("B");

-- CreateIndex
CREATE INDEX "_ProjectToStakeholder_B_index" ON "_ProjectToStakeholder"("B");

-- CreateIndex
CREATE INDEX "_ProjectToSkill_B_index" ON "_ProjectToSkill"("B");

-- CreateIndex
CREATE INDEX "_SkillToUser_B_index" ON "_SkillToUser"("B");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewedUserId_fkey" FOREIGN KEY ("reviewedUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demos" ADD CONSTRAINT "demos_demoProjectId_fkey" FOREIGN KEY ("demoProjectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_project_positions" ADD CONSTRAINT "user_project_positions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_project_positions" ADD CONSTRAINT "user_project_positions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_project_positions" ADD CONSTRAINT "user_project_positions_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemoToUser" ADD CONSTRAINT "_DemoToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "demos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemoToUser" ADD CONSTRAINT "_DemoToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStakeholder" ADD CONSTRAINT "_ProjectToStakeholder_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStakeholder" ADD CONSTRAINT "_ProjectToStakeholder_B_fkey" FOREIGN KEY ("B") REFERENCES "stakeholders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToSkill" ADD CONSTRAINT "_ProjectToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToSkill" ADD CONSTRAINT "_ProjectToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1754025702904 implements MigrationInterface {
    name = "InitialSchema1754025702904";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "certifications" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(255), "credentialId" character varying(100), "expirationDate" date NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "issueDate" date NOT NULL, "issuingOrganization" character varying(200), "level" character varying(50) NOT NULL, "levelDescription" character varying(100), "modifiedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modifiedBy" character varying(255), "name" character varying(200) NOT NULL, "studentId" uuid NOT NULL, CONSTRAINT "PK_fd763d412e4a1fb1b6dadd6e72b" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_certification_issuing_org" ON "certifications" ("issuingOrganization") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_certification_expiration_date" ON "certifications" ("expirationDate") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_certification_issue_date" ON "certifications" ("issueDate") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_certification_student_id" ON "certifications" ("studentId") `,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'ANONYMOUS', 'MODERATOR', 'USER')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."users_status_enum" AS ENUM('Happy', 'Sad')`,
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("accountNonExpired" boolean NOT NULL DEFAULT true, "accountNonLocked" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(255), "credentialsNonExpired" boolean NOT NULL DEFAULT true, "email" character varying(255) NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "modifiedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modifiedBy" character varying(255), "name" character varying(255), "password" character varying(128) NOT NULL, "permissions" text, "phoneNumbers" text, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "status" "public"."users_status_enum" NOT NULL DEFAULT 'Happy', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_user_account_status" ON "users" ("enabled", "credentialsNonExpired", "accountNonExpired", "accountNonLocked") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_user_role" ON "users" ("role") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_user_status" ON "users" ("status") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_user_email" ON "users" ("email") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_user_id_name" ON "users" ("id", "name") `,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."files_filetype_enum" AS ENUM('certificate', 'document', 'image', 'other', 'portfolio', 'resume', 'transcript')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."files_status_enum" AS ENUM('active', 'archived', 'deleted')`,
        );
        await queryRunner.query(
            `CREATE TABLE "files" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(255) DEFAULT 'ANONYMOUS', "description" character varying(500), "fileContent" bytea NOT NULL, "fileName" character varying(255) NOT NULL, "filePath" character varying(500), "fileSize" bigint NOT NULL, "fileType" "public"."files_filetype_enum" NOT NULL DEFAULT 'other', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "metadata" json, "mimeType" character varying(100) NOT NULL, "modifiedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modifiedBy" character varying(255) DEFAULT 'ANONYMOUS', "originalFileName" character varying(255) NOT NULL, "status" "public"."files_status_enum" NOT NULL DEFAULT 'active', "studentId" uuid NOT NULL, "tags" character varying(255), "uploadedBy" uuid, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_file_uploaded_by" ON "files" ("uploadedBy") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_file_status" ON "files" ("status") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_file_type" ON "files" ("fileType") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_file_student_id" ON "files" ("studentId") `,
        );
        await queryRunner.query(
            `CREATE TABLE "students" ("aptitudeTestScore" numeric(5,2), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(255) DEFAULT 'ANONYMOUS', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" character varying(500) NOT NULL, "major" character varying(200) NOT NULL, "maxBudget" numeric(14,2) NOT NULL, "minBudget" numeric(14,2) NOT NULL, "modifiedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modifiedBy" character varying(255) DEFAULT 'ANONYMOUS', "subjectCombination" json, "userId" uuid, "vsatScore" numeric(5,2), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_student_location" ON "students" ("location") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_student_major" ON "students" ("major") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_student_user_id" ON "students" ("userId") `,
        );
        await queryRunner.query(
            `CREATE TABLE "awards" ("awardDate" date NOT NULL, "awardId" character varying(100), "awardingOrganization" character varying(200), "category" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(255), "description" text, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level" character varying(50) NOT NULL, "modifiedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modifiedBy" character varying(255), "name" character varying(200) NOT NULL, "studentId" uuid NOT NULL, CONSTRAINT "PK_bc3f6adc548ff46c76c03e06377" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_award_category" ON "awards" ("category") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_award_date" ON "awards" ("awardDate") `,
        );
        await queryRunner.query(
            `CREATE INDEX "idx_award_student_id" ON "awards" ("studentId") `,
        );
        await queryRunner.query(
            `CREATE TABLE "posts" ("body" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "modifiedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modifiedBy" character varying, "title" character varying(255) NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "certifications" ADD CONSTRAINT "FK_94ecc704512cfe5019d2577a994" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "files" ADD CONSTRAINT "FK_f2cc0c836c7f1f89e552b8c4212" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "files" ADD CONSTRAINT "FK_a443b3a690edf7e690e3dace8d9" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "students" ADD CONSTRAINT "FK_e0208b4f964e609959aff431bf9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "awards" ADD CONSTRAINT "FK_df483bf7bb17b72ea43be46d1ae" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "awards" DROP CONSTRAINT "FK_df483bf7bb17b72ea43be46d1ae"`,
        );
        await queryRunner.query(
            `ALTER TABLE "students" DROP CONSTRAINT "FK_e0208b4f964e609959aff431bf9"`,
        );
        await queryRunner.query(
            `ALTER TABLE "files" DROP CONSTRAINT "FK_a443b3a690edf7e690e3dace8d9"`,
        );
        await queryRunner.query(
            `ALTER TABLE "files" DROP CONSTRAINT "FK_f2cc0c836c7f1f89e552b8c4212"`,
        );
        await queryRunner.query(
            `ALTER TABLE "certifications" DROP CONSTRAINT "FK_94ecc704512cfe5019d2577a994"`,
        );
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP INDEX "public"."idx_award_student_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_award_date"`);
        await queryRunner.query(`DROP INDEX "public"."idx_award_category"`);
        await queryRunner.query(`DROP TABLE "awards"`);
        await queryRunner.query(`DROP INDEX "public"."idx_student_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_student_major"`);
        await queryRunner.query(`DROP INDEX "public"."idx_student_location"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP INDEX "public"."idx_file_student_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_file_type"`);
        await queryRunner.query(`DROP INDEX "public"."idx_file_status"`);
        await queryRunner.query(`DROP INDEX "public"."idx_file_uploaded_by"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TYPE "public"."files_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."files_filetype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_id_name"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_status"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_role"`);
        await queryRunner.query(
            `DROP INDEX "public"."idx_user_account_status"`,
        );
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(
            `DROP INDEX "public"."idx_certification_student_id"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."idx_certification_issue_date"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."idx_certification_expiration_date"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."idx_certification_issuing_org"`,
        );
        await queryRunner.query(`DROP TABLE "certifications"`);
    }
}

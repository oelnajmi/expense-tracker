DO $$ BEGIN
 CREATE TYPE "public"."investment_frequency" AS ENUM('weekly', 'biweekly', 'monthly');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investment" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"initial_amount" numeric(10, 2) NOT NULL,
	"yearly_return" numeric(5, 2) NOT NULL,
	"recurring_amount" numeric(10, 2) NOT NULL,
	"frequency" "investment_frequency" NOT NULL,
	"years" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment" ADD CONSTRAINT "investment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

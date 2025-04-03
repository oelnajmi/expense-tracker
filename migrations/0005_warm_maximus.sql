CREATE TABLE IF NOT EXISTS "financial_goals" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"monthly_income" numeric(10, 2) NOT NULL,
	"savings_goal" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "financial_goals" ADD CONSTRAINT "financial_goals_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

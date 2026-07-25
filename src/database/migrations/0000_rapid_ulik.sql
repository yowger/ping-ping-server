CREATE TABLE "discord_connections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discordUserId" text NOT NULL,
	"guildId" text NOT NULL,
	"channelId" text NOT NULL,
	"accessToken" text NOT NULL,
	"refreshToken" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reminders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discordConnectionId" uuid NOT NULL,
	"jobId" text,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"scheduledAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_discordConnectionId_discord_connections_id_fk" FOREIGN KEY ("discordConnectionId") REFERENCES "public"."discord_connections"("id") ON DELETE cascade ON UPDATE no action;
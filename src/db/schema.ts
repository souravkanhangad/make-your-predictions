import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  googleId: text('google_id'),
  name: text('name'),
  email: text('email').notNull().unique(),
  avatar: text('avatar'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const contests = sqliteTable('contests', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  prize: text('prize').notNull(),
  team1: text('team1').notNull(),
  team2: text('team2').notNull(),
  team1Flag: text('team1_flag').notNull(),
  team2Flag: text('team2_flag').notNull(),
  deadline: integer('deadline', { mode: 'timestamp' }).notNull(),
  winnerCount: integer('winner_count').notNull().default(1),
  bannerUrl: text('banner_url'),
  status: text('status').notNull().default('open'), // 'open', 'closed', 'completed'
  finalScoreTeam1: integer('final_score_team1'),
  finalScoreTeam2: integer('final_score_team2'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const predictions = sqliteTable('predictions', {
  id: text('id').primaryKey(),
  contestId: text('contest_id').notNull().references(() => contests.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  countryCode: text('country_code').notNull(),
  predictedScore1: integer('predicted_score1').notNull(),
  predictedScore2: integer('predicted_score2').notNull(),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const winners = sqliteTable('winners', {
  id: text('id').primaryKey(),
  contestId: text('contest_id').notNull().references(() => contests.id),
  predictionId: text('prediction_id').notNull().references(() => predictions.id),
  selectionMethod: text('selection_method').notNull(), // 'exact', 'random', 'closest'
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export type GuildId = string;

export interface BotCommand {
  command: string,
  param: string | null,
}

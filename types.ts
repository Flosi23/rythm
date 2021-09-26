export type GuildId = string;

export interface BotCommand {
  command: string,
  param: string | null,
}

interface YoutubeThumbnail {
  url: string,
  width: number,
  height: number,
}

export interface YoutubeVideoBase {
  kind: string,
  etag: string,
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
        default: YoutubeThumbnail,
        medium: YoutubeThumbnail,
        high: YoutubeThumbnail
    }
    channelTitle: string,
  }
}
export interface YoutubeSearch extends YoutubeVideoBase {
  id: {
    kind: string,
    videoId: string,
    channelId: string,
    playlistId: string,
  },
}

export interface YoutubePlaylistItem extends YoutubeVideoBase {
  id: string,
  contentDetails: {
    videoId: string,
  }
}

export interface YoutubeVideo extends YoutubeVideoBase {
  id: string,
  contentDetails: {
    duration: string,
  },
}

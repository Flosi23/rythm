import botMessages from '../interfaces/bot.message';

const botMessages: botMessages = {
  searchingYoutubeVideo: (query: string) =>
    `:musical_note Searching for \`${query}\` on YouTube`,
  botLeft: ':arrow_right: Bot left',
};

export default botMessages;

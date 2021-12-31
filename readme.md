# Rythm Bot

### Description

A music bot, similar to rythm to queue up and play youtube videos and playlists

#### Commands:

- `play` | `p` - Searches for a video and adds it to the queue. If the queue is empty the song is played
- `forceplay` | `fp` - Searches for a video and plays it after the current song
- `loop` - Loops the current song
- `loopq` | `loopqueue` - The queue will be looped
- `quit` | `leave` - The bot leaves the voice channel and the queue is cleared.
- `skipto` - Skips to the given position in the queue
- `q` | `queue` - Shows the queue

### Installation

- Install the latest node stable release
- run `npm install` or if you are using yarn run `yarn`

### Configuration

- First make a new `.env` file in the root directory using the template given in the `.env.example` file
- These are the 4 things you need to configure: 
1. `PORT` This is the port the application should run on. A default value is e.g `3000`
2. `NODE_ENV` Default value should be `production`. If you are currently developing set it to `development`
3. `BOT_TOKEN` Your discord Bot Token. Here is a good tutorial on how to get one: [https://www.writebots.com/discord-bot-token/](https://www.writebots.com/discord-bot-token/)
4. `YOUTUBE_API_KEY` This is the most complicated part. The youtube api key grants the bot access to the youtube api. Here is another tutorial on how to get one [https://blog.hubspot.com/website/how-to-get-youtube-api-key](https://blog.hubspot.com/website/how-to-get-youtube-api-key)

### Running the Application
- In order to build and run the application, use: `npm run serve`
- If you only want to build the application, use: `npm run build`
- If you only want to run an already build version, use: `npm run start`

### Code Documentation

For a full Code documentation visit [https://flosi23.github.io/rythm/](https://flosi23.github.io/rythm/)

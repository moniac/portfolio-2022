const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
  });
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  return response.json();
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getPlaying = async () => {
  let spotifyError = false;
  try {
    const response = await getNowPlaying();
    const song = await response.json();

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[1].url;
    const songUrl = song.item.external_urls.spotify;

    return {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      spotifyError,
    };
  } catch (error) {}

  try {
    const recentlyPlayedResponse = await getRecentlyPlayed();
    const formattedRecentlyPlayed = await recentlyPlayedResponse.json();
    const firstRecentlyPlayed = formattedRecentlyPlayed.items[0];

    return {
      isPlaying: false,
      album: firstRecentlyPlayed.track.album.name,
      artist: firstRecentlyPlayed.track.album.artists
        .map((_artist) => _artist.name)
        .join(", "),
      title: firstRecentlyPlayed.track.name,
      albumImageUrl: firstRecentlyPlayed.track.album.images[1].url,
      songUrl: firstRecentlyPlayed.track.external_urls.spotify,
      spotifyError,
    };
  } catch (error) {
    spotifyError = true;
  }

  return { spotifyError };
};

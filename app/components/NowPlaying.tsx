interface Props {
  title: string;
  artist: string;
  albumImageUrl: string;
  isPlaying: boolean;
}

export const NowPlaying = (props: Props) => {
  const { title, artist, albumImageUrl, isPlaying } = props;

  const renderText = () => {
    if (isPlaying) {
      return (
        <>
          <i>Currently</i>, I am listening to <b>{title}</b> by <b>{artist}</b>.
        </>
      );
    }

    return (
      <>
        I was listening to <b>{title}</b> by <b>{artist}</b>.
      </>
    );
  };
  return (
    <div className="now-playing">
      <p>{renderText()}</p>
      <img src={albumImageUrl} />
    </div>
  );
};

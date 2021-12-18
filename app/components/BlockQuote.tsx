interface Props {
  children: React.ReactNode;
}

export const BlockQuote = (props: Props) => {
  const { children } = props;

  return <blockquote className="BlockQuote">{children}</blockquote>;
};

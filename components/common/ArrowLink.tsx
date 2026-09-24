type ArrowLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
};

export function ArrowLink({ children, ...props }: ArrowLinkProps) {
  return <a className="arrow-link" {...props}>{children} <span aria-hidden="true">↗</span></a>;
}
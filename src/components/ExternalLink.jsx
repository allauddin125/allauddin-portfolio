// Every link that opens a new tab goes through here so `rel` is never forgotten.
export default function ExternalLink({ href, children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

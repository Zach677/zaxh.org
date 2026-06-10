// Corner crop marks framing the viewport — part of the paper aesthetic.
// Purely decorative; hidden on small screens (see components.css).
export const PaperFrame = () => {
  return (
    <div className="paper-frame" aria-hidden="true">
      <span className="tl" />
      <span className="tr" />
      <span className="bl" />
      <span className="br" />
    </div>
  )
}

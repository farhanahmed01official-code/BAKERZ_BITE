export default function FeaturedCard({ image, title }) {
  return (
    <section className="bb-featured">
      <div className="bb-featured-img">
        <img src={image} alt={title} />
      </div>
      <div className="bb-featured-content">
        <h2 className="bb-featured-title">{title}</h2>
      </div>
    </section>
  )
}
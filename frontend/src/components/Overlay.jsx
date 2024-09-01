import './Overlay.css'

export default function Overlay({ children, message }) {
  return (
    <section className="background-section">
      {children}
      {/* <div className="overlay-content">
        <h1>Bruin Business</h1>
        <p>n/a</p>
      </div> */}
    </section>
  );
}

import './ComoFiz.css';

export function ComoFiz() {
  return (
    <main className="como-fiz">
      <section className="como-fiz__intro">
        <p className="hero__eyebrow">registro</p>
        <h1>Como eu fiz a Silent Musics</h1>
      </section>

      <div className="como-fiz__video">
        <iframe
          src={`https://www.youtube.com/embed/euGj9-6Vr6k?si=HMIVAqri9CoSNvm8`}
          title="Como eu fiz a Silent Musics"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </main>
  );
}

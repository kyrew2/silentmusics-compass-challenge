import './ComoFiz.css';

const VIDEO_ID = 'SEU_VIDEO_ID_AQUI';

export function ComoFiz() {
  return (
    <main className="como-fiz">
      <section className="como-fiz__intro">
        <p className="hero__eyebrow">registro</p>
        <h1>Como eu fiz a Silent Musics</h1>
      </section>

      <div className="como-fiz__video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
          title="Como eu fiz a Silent Musics"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </main>
  );
}

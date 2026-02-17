export default function CalendlySection() {
  const calendlyUrl = 'https://calendly.com/zetdigi-amazon-services/30min?embed_type=Inline&hide_gdpr_banner=1&background_color=e6e6e6&text_color=ffffff&primary_color=ffffff';

  return (
    <section id="clanderly" className="py-20 w-full" style={{ backgroundColor: '#e6e6e6' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden" style={{ minHeight: '850px', backgroundColor: '#e6e6e6' }}>
          <iframe
            src={calendlyUrl}
            scrolling="yes"
            title="Schedule a Meeting - Calendly"
            loading="eager"
            fetchPriority="high"
            style={{
              width: '100%',
              border: 'none',
              overflow: 'auto',
              opacity: 1,
              visibility: 'visible',
              pointerEvents: 'auto',
              display: 'block',
              height: '850px',
              minWidth: '320px'
            }}
          />
        </div>
      </div>
    </section>
  );
}

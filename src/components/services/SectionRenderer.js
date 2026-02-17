import ListSection from './ListSection';
import TipsSection from './TipsSection';
import CardsSection from './CardsSection';
import ContentSection from './ContentSection';
import ProcessSection from './ProcessSection';
import RecentWorkSection from './RecentWorkSection';

export default function SectionRenderer({ section }) {
  if (!section) return null;

  switch (section.type) {
    case 'list':
      return <ListSection data={section} />;
    case 'tips':
      return <TipsSection data={section} />;
    case 'cards':
      return <CardsSection data={section} />;
    case 'content':
      return <ContentSection data={section} />;
    case 'process':
      return <ProcessSection data={section} />;
    case 'recent-work':
      return <RecentWorkSection data={section} />;
    default:
      return null;
  }
}

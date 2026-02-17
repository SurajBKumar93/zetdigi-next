import { ServiceRecentWorkGrid } from './ServiceSharedSections';

export default function RecentWorkSection({ data }) {
  if (!data || !data.items || data.items.length === 0) return null;

  return <ServiceRecentWorkGrid title={data.title} items={data.items} />;
}

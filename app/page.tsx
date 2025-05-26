import Faq from '@/components/layout/faq';
import PricingComponent from '@/components/pricing/pricing';
import PartnersComponent from '@/components/scrolling/partners';
import TechnologiesComponent from '@/components/scrolling/technologies';
import AppMainSections from '@/components/section/app-main-section';
import Sitemap from '@/components/sitemap/sitemap';
import TeamMemberComponent from '@/components/team/team-member';

export default function App() {
  return (
    <div>
      <AppMainSections />
      <PartnersComponent />
      <TechnologiesComponent />
      <PricingComponent />
      <TeamMemberComponent />
      <Faq />
      <Sitemap />
    </div>
  );
}

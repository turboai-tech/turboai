'use client';

import Faq from '@/components/layout/faq';
import PricingComponent from '@/components/pricing/pricing';
import CollaborationsComponent from '@/components/scrolling/collaborations';
import AppMainSections from '@/components/section/app-main-section';
import Sitemap from '@/components/sitemap/sitemap';
import TeamMemberComponent from '@/components/team/team-member';

export default function App() {
  return (
    <>
      <AppMainSections />
      <CollaborationsComponent />
      <PricingComponent />
      <TeamMemberComponent />
      <Faq />
      <Sitemap />
    </>
  );
}

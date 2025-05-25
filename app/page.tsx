'use client';

import Faq from '@/components/layout/faq';
import PartnersComponent from '@/components/scrolling/partners';
import PowersComponent from '@/components/scrolling/powers';
import AppMainSections from '@/components/section/app-main-section';
import TeamMemberComponent from '@/components/team/team-member';

export default function App() {
  return (
    <div>
      <AppMainSections />
      <PartnersComponent />
      <PowersComponent />
      <TeamMemberComponent />
      <Faq />
    </div>
  );
}

'use client';

import AiCloudsComponent from './ai_clouds';
import AiModelsComponent from './ai_models';
import CustomersComponent from './customers';
import TechnologiesComponent from './technologies';

export default function CollaborationsComponent() {
  return (
    <div id="collaborations-container" className="flex flex-col gap-24">
      <CustomersComponent />
      <AiModelsComponent />
      <AiCloudsComponent />
      <TechnologiesComponent />
    </div>
  );
}

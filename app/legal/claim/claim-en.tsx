'use client';

export default function ClaimEnPage() {
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-auto p-4 sm:p-6 lg:p-8 w-4/5">
      <h1 className="text-2xl font-bold my-4 text-center">Disclaimer</h1>
      <div className="flex flex-col gap-2 my-4 text-center">
        <p className="text-sm text-gray-500">
          <strong>Last Updated:</strong> June 15, 2025
        </p>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <p>
          The information and services provided by Turbo AI Technology
          (Shanghai) Co., Ltd. ("we," "us," or "our") on www.iturboai.com (the
          “Site”) and through our software-as-a-service products (the
          “Services”) are for general informational and practical purposes only.
        </p>

        <h2 className="text-lg font-bold my-2">1. No Professional Advice</h2>
        <p>
          The content, components, templates, and any materials generated by our
          AI-powered Services are not intended to be a substitute for
          professional advice. You should not rely on the information from our
          Services as a basis for making any business, legal, design, or other
          decisions. Always seek the advice of a qualified professional with any
          questions you may have regarding a specific issue.
        </p>

        <h2 className="text-lg font-bold my-2">
          2. "AS IS" and "AS AVAILABLE"
        </h2>
        <p>
          All information and Services on the Site are provided in good faith;
          however, we make no representation or warranty of any kind, express or
          implied, regarding the accuracy, adequacy, validity, reliability,
          availability, or completeness of any information or generated content
          on the Site or Services. THE SERVICES ARE PROVIDED ON AN "AS IS" AND
          "AS AVAILABLE" BASIS.
        </p>

        <h2 className="text-lg font-bold my-2">3. AI-Generated Content</h2>
        <p>
          Our Services utilize artificial intelligence to generate content. You
          acknowledge and agree that:
        </p>
        <ul className="list-disc list-inside pl-4 gap-2">
          <li>
            AI-generated content may contain errors, inaccuracies, or be
            incomplete. It may also produce content that is similar or identical
            to content generated for other users.
          </li>
          <li>
            We do not guarantee the uniqueness, accuracy, or fitness for a
            particular purpose of any AI-generated content.
          </li>
          <li>
            You are solely responsible for reviewing, editing, and verifying any
            content generated by our Services before use or publication. Your
            use of AI-generated content is at your own risk.
          </li>
        </ul>

        <h2 className="text-lg font-bold my-2">4. External Links Disclaimer</h2>
        <p>
          The Site and Services may contain links to other websites or content
          belonging to or originating from third parties. Such external links
          are not investigated, monitored, or checked for accuracy, adequacy,
          validity, reliability, availability, or completeness by us. We do not
          warrant, endorse, guarantee, or assume responsibility for any
          information offered by third-party websites.
        </p>

        <h2 className="text-lg font-bold my-2">5. No Guarantees of Results</h2>
        <p>
          We do not guarantee that you will achieve any specific results from
          the use of our Services. Your success depends on many factors,
          including your own effort, skill, and application of the generated -
          content.
        </p>

        <h2 className="text-lg font-bold my-2">6. Limitation of Liability</h2>
        <p>
          Under no circumstance shall we have any liability to you for any loss
          or damage of any kind incurred as a result of the use of the Site or
          Services or reliance on any information provided. Your use of the Site
          and Services and your reliance on any information is solely at your
          own risk.
        </p>
      </div>
    </div>
  );
}

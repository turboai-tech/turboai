'use client';

export default function TermEnPage() {
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-auto p-4 sm:p-6 lg:p-8 w-4/5">
      <h1 className="text-2xl font-bold my-4 text-center">
        Terms & Conditions
      </h1>
      <div className="flex flex-col gap-2 my-4 text-center">
        <p className="text-sm text-gray-500">
          <strong>Last Updated:</strong> June 15, 2025
        </p>
        <p className="text-sm text-gray-500">
          <strong>Effective Date:</strong> May 22, 2025
        </p>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <p>
          Welcome to Turbo AI, provided by Turbo AI Inc. ("Turbo AI", "we",
          "us", or "our"). These Terms & Conditions govern your use of the Turbo
          AI website (www.iturboai.com) and the purchase and use of Turbo AI
          products (“Services”). By accessing or using our Services, you agree
          to be bound by these Terms & Conditions and our Privacy Policy.
        </p>
        <h2 className="text-lg font-bold my-2">1. Acceptance of Terms </h2>
        <p>
          By using Turbo AI, you agree to these Terms & Conditions. If you do
          not agree, do not use our Services.
        </p>
        <h2 className="text-lg font-bold my-2">2. User Responsibilities</h2>
        <p>
          You agree to provide accurate and complete information when
          registering or purchasing our Services. You are responsible for
          maintaining the confidentiality of your account and password. You
          agree to use our Services legally and ethically.
        </p>
        <h2 className="text-lg font-bold my-2">3. Payment Policy</h2>
        <p>
          Purchases are processed via Stripe, and you must agree to Stripe'
          terms and conditions. Refund details are as specified in our Privacy
          Policy.
        </p>
        <h2 className="text-lg font-bold my-2">4. Refund Policy</h2>
        <p>
          We are committed to customer satisfaction and offer a 7-day refund
          policy from the date of purchase. However, we also protect against the
          potential misuse of our refund policy in the following ways:
        </p>
        <ul className="list-disc list-inside pl-4 gap-2">
          <li>
            Refunds are granted only if the purchased components have not been
            extensively downloaded, copied, or used, indicating genuine
            dissatisfaction or a change of circumstances by the customer.
          </li>
          <li>
            Downloading Figma files and subsequently requesting a refund is
            considered a sign of non-genuine dissatisfaction and may result in
            refund denial.
          </li>
          <li>
            We reserve the right to deny refund requests if there is evidence of
            significant use, copying of our components, or downloading of design
            assets, suggesting that the customer has benefited from our
            Services.
          </li>
          <li>
            To request a refund, customers must contact our support team at{' '}
            <a
              href="mailto:turboai@gmail.com"
              className="text-primary underline"
            >
              turboai@gmail.com
            </a>{' '}
            within the refund period, providing the purchase details and a valid
            reason for the refund request.
          </li>
          <li>
            All refund requests are reviewed on a case-by-case basis, and we
            reserve the right to make the final decision on refund eligibility.
          </li>
          <li>
            Approved refund requests will be processed within 5-7 business days,
            with the refund made to the original payment method used for the
            purchase.
          </li>
        </ul>
        <p>
          This policy is designed to ensure that our customers can shop with
          confidence while protecting our intellectual property and the
          integrity of our services.
        </p>
        <p>
          Note: For customers in the UK, the refund policy is extended to 14
          days from the date of purchase, in accordance with local consumer
          protection laws.
        </p>
        <h2 className="text-lg font-bold my-2">5. Privacy Policy</h2>
        <p>
          Our collection, use, and sharing of your personal information are
          described in our{' '}
          <a href="/privacy" className="text-primary underline">
            Privacy Policy
          </a>
          .
        </p>
        <h2 className="text-lg font-bold my-2">
          6. Intellectual Property Rights
        </h2>
        <p>
          All intellectual property rights in the Components and Templates are
          owned by Turbo AI. You agree not to reproduce, duplicate, copy, sell,
          resell, or exploit any portion of the Services without express written
          permission from us.
        </p>
        <h2 className="text-lg font-bold my-2">7. Modification of Terms</h2>
        <p>
          Turbo AI Inc. reserves the right to modify these Terms & Conditions at
          any time. Changes will be effective immediately upon posting.
        </p>
        <h2 className="text-lg font-bold my-2">8. External Website Links</h2>
        <p>
          Our Services may contain links to external websites, including Stripe.
          We are not responsible for the content or privacy practices of these
          external sites.
        </p>
        <h2 className="text-lg font-bold my-2">9. Limitation of Liability</h2>
        <p>
          Turbo AI Inc. shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages resulting from the use of
          our Services.
        </p>
        <h2 className="text-lg font-bold my-2">10. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Turbo AI Inc. and its
          affiliates, officers, agents, and employees from any claim or demand
          made by any third party due to or arising out of your use of our
          Services.
        </p>
        <h2 className="text-lg font-bold my-2">11. Governing Law</h2>
        <p>
          These Terms & Conditions are governed by the laws of the jurisdiction
          where Turbo AI Inc. is registered.
        </p>
        <h2 className="text-lg font-bold my-2">
          12. Fair Use and Fraud Prevention
        </h2>
        <p>
          To ensure a fair environment, we monitor for abuse or fraud, such as
          downloading content excessively then requesting refunds. Violations
          may lead to actions like account termination or refund denial. If you
          believe you've been wrongly accused, contact us at{' '}
          <a href="mailto:turboai@gmail.com" className="text-primary underline">
            turboai@gmail.com
          </a>
          .
        </p>
        <h2 className="text-lg font-bold my-2">13. Contact Information</h2>
        <p>
          If you have any questions about these Terms & Conditions, please
          contact us at{' '}
          <a href="mailto:turboai@gmail.com" className="text-primary underline">
            turboai@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

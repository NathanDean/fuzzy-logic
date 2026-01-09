import Text from '@/components/ui/Text';

export default function PrivacyPolicy() {
  return (
    <div className="sm:w-xl lg:w-3xl xl:w-4xl space-y-4 large-text">
      {/* Main heading */}
      <h1>Fuzzy Logic customer privacy notice</h1>

      <Text>
        This privacy notice tells you what to expect us to do with your personal
        information.
      </Text>

      {/* Contact details section */}
      <section className="space-y-4">
        <h2>Contact details</h2>
        <div>
          <h3>Email</h3>
          <Text>data@fzzy.co.uk</Text>
        </div>
      </section>

      {/* What information we collect section */}
      <section className="space-y-4">
        <h2>What information we collect, use, and why</h2>

        <Text>
          We collect or use the following information to provide services and
          goods, including delivery:
        </Text>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Text>Names and contact details</Text>
          </li>
          <li>
            <Text>Purchase or account history</Text>
          </li>
        </ul>
      </section>

      {/* Lawful bases section */}
      <section className="space-y-4">
        <h2>Lawful bases and data protection rights</h2>

        <Text>
          Under UK data protection law, we must have a {`"lawful basis"`} for
          collecting and using your personal information. There is a list of
          possible{' '}
          <a
            href="https://ico.org.uk/for-organisations/advice-for-small-organisations/key-data-protection-terms-you-need-to-know/#lawfulbasis"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text as="span">lawful bases</Text>
          </a>{' '}
          in the UK GDPR. You can find out more about lawful bases on the{' '}
          {`ICO's`} website.
        </Text>

        <Text>
          Which lawful basis we rely on may affect your data protection rights
          which are set out in brief below. You can find out more about your
          data protection rights and the exemptions which may apply on the{' '}
          {`ICO's`} website:
        </Text>

        <ul className="list-disc pl-5 space-y-4 detail-text">
          <li>
            <Text>
              <span className="font-bold">Your right of access</span> - You have
              the right to ask us for copies of your personal information. You
              can request other information such as details about where we get
              personal information from and who we share personal information
              with. There are some exemptions which means you may not receive
              all the information you ask for.
              <a
                href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#roa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text as="span">You can read more about this right here</Text>
              </a>
              .
            </Text>
          </li>

          <li>
            <Text>
              <span className="font-bold">Your right to rectification</span> -
              You have the right to ask us to correct or delete personal
              information you think is inaccurate or incomplete.
              <a
                href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rtr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text as="span">You can read more about this right here</Text>
              </a>
              .
            </Text>
          </li>

          <li>
            <Text>
              <span className="font-bold">Your right to erasure</span> - You
              have the right to ask us to delete your personal information.
              <a
                href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rte"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text as="span">You can read more about this right here</Text>
              </a>
              .
            </Text>
          </li>

          <li>
            <Text>
              <span className="font-bold">
                Your right to restriction of processing
              </span>{' '}
              - You have the right to ask us to limit how we can use your
              personal information.
              <a
                href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rtrop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text as="span">
                  You can read more about this right here
                </Text>{' '}
              </a>
              .
            </Text>
          </li>

          <li>
            <Text>
              <span className="font-bold">
                Your right to object to processing
              </span>{' '}
              - You have the right to object to the processing of your personal
              data.
              <a
                href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text as="span">You can read more about this right here</Text>
              </a>
              .
            </Text>
          </li>

          <li>
            <Text>
              <span className="font-bold">Your right to data portability</span>{' '}
              - You have the right to ask that we transfer the personal
              information you gave us to another organisation, or to you.
              <a
                href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rtdp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text as="span">You can read more about this right here</Text>
              </a>
              .
            </Text>
          </li>

          <li>
            <Text>
              <span className="font-bold">Your right to withdraw consent</span>{' '}
              - When we use consent as our lawful basis you have the right to
              withdraw your consent at any time.
              <a
                href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rtwc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text as="span">You can read more about this right here</Text>
              </a>
              .
            </Text>
          </li>
        </ul>

        <Text>
          If you make a request, we must respond to you without undue delay and
          in any event within one month.
        </Text>

        <Text>
          To make a data protection rights request, please contact us using the
          contact details at the top of this privacy notice.
        </Text>

        {/* Lawful bases subsection */}
        <div className="space-y-4">
          <h3>Our lawful bases for the collection and use of your data</h3>

          <Text>
            Our lawful bases for collecting or using personal information to{' '}
            <span className="font-bold">provide services and goods</span> are:
          </Text>

          <ul className="list-disc pl-5 space-y-1">
            <li>
              <Text>
                <span className="font-bold">Legitimate interests</span> -{' '}
                {`we're`} collecting or using your information because it
                benefits you, our organisation or someone else, without causing
                an undue risk of harm to anyone. All of your data protection
                rights may apply, except the right to portability. Our
                legitimate interests are:
              </Text>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>
                  <Text>
                    We collect {`customers'`} names to allow us to keep track of
                    who is attending workshops. We collect {`customers'`} email
                    addresses to enable them to log into their accounts and
                    track their bookings.
                  </Text>
                </li>
              </ul>
            </li>
          </ul>

          <Text>
            For more information on our use of legitimate interests as a lawful
            basis you can contact us using the contact details set out above.
          </Text>
        </div>
      </section>

      {/* Where we get information section */}
      <section className="space-y-4">
        <h2>Where we get personal information from</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Text>Directly from you</Text>
          </li>
        </ul>
      </section>

      {/* How long we keep information section */}
      <section className="space-y-4">
        <h2>How long we keep information</h2>
        <Text>
          We retain your personal information for as long as necessary to
          provide our services and fulfill our legal obligations. Specifically:
        </Text>
        <ul className="list-disc pl-5 space-y-1 detail-text">
          <li>
            <Text>
              Account information is kept while your account is active and for 7
              years after closure for legal and tax purposes
            </Text>
          </li>
          <li>
            <Text>
              Booking and payment records are retained for 7 years after the
              workshop date for accounting and legal requirements
            </Text>
          </li>
          <li>
            <Text>
              Marketing communications data is kept until you unsubscribe or
              request deletion
            </Text>{' '}
          </li>
        </ul>
      </section>

      {/* Who we share information with section */}
      <section className="space-y-4">
        <h2>Who we share information with</h2>

        <h3>Others we share personal information with</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Text>
              Suppliers and service providers (including payment processors and
              email service providers)
            </Text>
          </li>
        </ul>
      </section>

      {/* How to complain section */}
      <section className="space-y-4">
        <h2>How to complain</h2>

        <Text>
          If you have any concerns about our use of your personal data, you can
          make a complaint to us using the contact details at the top of this
          privacy notice.
        </Text>

        <Text>
          If you remain unhappy with how {`we've`} used your data after raising
          a complaint with us, you can also complain to the ICO.
        </Text>

        <div className="space-y-1">
          <Text>
            <span className="font-bold">The {`ICO's`} address:</span>
          </Text>
          <address className="not-italic pl-4">
            <Text>Information {`Commissioner's`} Office</Text>
            <Text>Wycliffe House</Text>
            <Text>Water Lane</Text>
            <Text>Wilmslow</Text>
            <Text>Cheshire</Text>
            <Text>SK9 5AF</Text>
          </address>

          <Text>
            <span className="font-bold">Helpline number:</span> 0303 123 1113
          </Text>
          <Text>
            <span className="font-bold">Website:</span>{' '}
            <a
              href="https://www.ico.org.uk/make-a-complaint/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text as="span">https://www.ico.org.uk/make-a-complaint/</Text>
            </a>
          </Text>
        </div>
      </section>

      {/* Last updated section */}
      <section className="space-y-4">
        <h2>Last updated</h2>
        <Text>This privacy notice was last updated on 26/05/2025.</Text>
      </section>
    </div>
  );
}

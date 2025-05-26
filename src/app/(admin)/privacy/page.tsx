export default function PrivacyPolicy() {
  return (
    <div className="sm:w-xl lg:w-3xl xl:w-4xl space-y-4 large-text">
      
      {/* Main heading */}
      <h1 className="heading">Fuzzy Logic customer privacy notice</h1>
      
      <p className="detail-text">
        This privacy notice tells you what to expect us to do with your personal information.
      </p>

      {/* Contact details section */}
      <section className="space-y-2">
        <h2 className="card-heading">Contact details</h2>
        <div>
          <h3 className="info-heading">Email</h3>
          <p className="detail-text">data@fzzy.co.uk</p>
        </div>
      </section>

      {/* What information we collect section */}
      <section className="space-y-2">
        <h2 className="card-heading">What information we collect, use, and why</h2>
        
        <p className="detail-text">
          We collect or use the following information to <strong>provide services and goods, including delivery</strong>:
        </p>
        
        <ul className="list-disc pl-5 space-y-1 detail-text">
          <li>Names and contact details</li>
          <li>Purchase or account history</li>
        </ul>
      </section>

      {/* Lawful bases section */}
      <section className="space-y-2">
        <h2 className="card-heading">Lawful bases and data protection rights</h2>
        
        <p className="detail-text">
          Under UK data protection law, we must have a "lawful basis" for collecting and using your personal information. 
          There is a list of possible <a href="https://ico.org.uk/for-organisations/advice-for-small-organisations/key-data-protection-terms-you-need-to-know/#lawfulbasis" target="_blank" rel="noopener noreferrer">lawful bases</a> in the UK GDPR. 
          You can find out more about lawful bases on the ICO's website.
        </p>

        <p className="detail-text">
          Which lawful basis we rely on may affect your data protection rights which are set out in brief below. 
          You can find out more about your data protection rights and the exemptions which may apply on the ICO's website:
        </p>

        <ul className="list-disc pl-5 space-y-2 detail-text">
          <li>
            <strong>Your right of access</strong> - You have the right to ask us for copies of your personal information. 
            You can request other information such as details about where we get personal information from and who we share personal information with. 
            There are some exemptions which means you may not receive all the information you ask for. 
            <a href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#roa" target="_blank" rel="noopener noreferrer">You can read more about this right here</a>.
          </li>
          
          <li>
            <strong>Your right to rectification</strong> - You have the right to ask us to correct or delete personal information you think is inaccurate or incomplete. 
            <a href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rtr" target="_blank" rel="noopener noreferrer">You can read more about this right here</a>.
          </li>
          
          <li>
            <strong>Your right to erasure</strong> - You have the right to ask us to delete your personal information. 
            <a href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rte" target="_blank" rel="noopener noreferrer">You can read more about this right here</a>.
          </li>
          
          <li>
            <strong>Your right to restriction of processing</strong> - You have the right to ask us to limit how we can use your personal information. 
            <a href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rtrop" target="_blank" rel="noopener noreferrer">You can read more about this right here</a>.
          </li>
          
          <li>
            <strong>Your right to object to processing</strong> - You have the right to object to the processing of your personal data. 
            <a href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rto" target="_blank" rel="noopener noreferrer">You can read more about this right here</a>.
          </li>
          
          <li>
            <strong>Your right to data portability</strong> - You have the right to ask that we transfer the personal information you gave us to another organisation, or to you. 
            <a href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rtdp" target="_blank" rel="noopener noreferrer">You can read more about this right here</a>.
          </li>
          
          <li>
            <strong>Your right to withdraw consent</strong> - When we use consent as our lawful basis you have the right to withdraw your consent at any time. 
            <a href="https://ico.org.uk/for-organisations/advice-for-small-organisations/create-your-own-privacy-notice/your-data-protection-rights/#rtwc" target="_blank" rel="noopener noreferrer">You can read more about this right here</a>.
          </li>
        </ul>

        <p className="detail-text">
          If you make a request, we must respond to you without undue delay and in any event within one month.
        </p>

        <p className="detail-text">
          To make a data protection rights request, please contact us using the contact details at the top of this privacy notice.
        </p>

        {/* Lawful bases subsection */}
        <div className="space-y-2">
          <h3 className="info-heading">Our lawful bases for the collection and use of your data</h3>
          
          <p className="detail-text">
            Our lawful bases for collecting or using personal information to <strong>provide services and goods</strong> are:
          </p>
          
          <ul className="list-disc pl-5 space-y-1 detail-text">
            <li>
              <strong>Legitimate interests</strong> - we're collecting or using your information because it benefits you, our organisation or someone else, 
              without causing an undue risk of harm to anyone. All of your data protection rights may apply, except the right to portability. 
              Our legitimate interests are:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>
                  We collect customers' names to allow us to keep track of who is attending workshops. 
                  We collect customers' email addresses to enable them to log into their accounts and track their bookings.
                </li>
              </ul>
            </li>
          </ul>

          <p className="detail-text">
            For more information on our use of legitimate interests as a lawful basis you can contact us using the contact details set out above.
          </p>
        </div>
      </section>

      {/* Where we get information section */}
      <section className="space-y-2">
        <h2 className="card-heading">Where we get personal information from</h2>
        <ul className="list-disc pl-5 space-y-1 detail-text">
          <li>Directly from you</li>
        </ul>
      </section>

      {/* How long we keep information section */}
      <section className="space-y-2">
        <h2 className="card-heading">How long we keep information</h2>
        <p className="detail-text">
          We retain your personal information for as long as necessary to provide our services and fulfill our legal obligations. 
          Specifically:
        </p>
        <ul className="list-disc pl-5 space-y-1 detail-text">
          <li>Account information is kept while your account is active and for 7 years after closure for legal and tax purposes</li>
          <li>Booking and payment records are retained for 7 years after the workshop date for accounting and legal requirements</li>
          <li>Marketing communications data is kept until you unsubscribe or request deletion</li>
        </ul>
      </section>

      {/* Who we share information with section */}
      <section className="space-y-2">
        <h2 className="card-heading">Who we share information with</h2>
        
        <h3 className="info-heading">Others we share personal information with</h3>
        <ul className="list-disc pl-5 space-y-1 detail-text">
          <li>Suppliers and service providers (including payment processors and email service providers)</li>
        </ul>
      </section>

      {/* How to complain section */}
      <section className="space-y-2">
        <h2 className="card-heading">How to complain</h2>
        
        <p className="detail-text">
          If you have any concerns about our use of your personal data, you can make a complaint to us using the contact details at the top of this privacy notice.
        </p>

        <p className="detail-text">
          If you remain unhappy with how we've used your data after raising a complaint with us, you can also complain to the ICO.
        </p>

        <div className="space-y-1 detail-text">
          <p><strong>The ICO's address:</strong></p>
          <address className="not-italic pl-4">
            Information Commissioner's Office<br />
            Wycliffe House<br />
            Water Lane<br />
            Wilmslow<br />
            Cheshire<br />
            SK9 5AF
          </address>
          
          <p><strong>Helpline number:</strong> 0303 123 1113</p>
          <p><strong>Website:</strong> <a href="https://www.ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">https://www.ico.org.uk/make-a-complaint/</a></p>
        </div>
      </section>

      {/* Last updated section */}
      <section className="space-y-2">
        <h2 className="card-heading">Last updated</h2>
        <p className="detail-text">This privacy notice was last updated on 26/05/2025.</p>
      </section>

    </div>
  );
}
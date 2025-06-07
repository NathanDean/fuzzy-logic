export default function CookiePolicy() {
  return (
    <div className="sm:w-xl lg:w-3xl xl:w-4xl space-y-4 large-text">
      <h1 className="heading">Cookie Policy</h1>

      <div className="space-y-6 medium-text">
        <p>
          Our website uses strictly necessary cookies to provide essential
          functionality. No consent is required for these cookies as they are
          essential for the website to work properly.
        </p>

        <div>
          <h2 className="card-heading mb-4">Cookies we use</h2>
          <div className="space-y-4">
            {/* Authentication cookies */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="card-subheading mb-2">Authentication Cookies</h3>
              <p className="detail-text mb-2">
                These cookies are essential to keep you logged in and secure
                your account. They remember your login status and protect
                against unauthorised access.
              </p>
              <div className="detail-text text-gray-600">
                <p>
                  <strong>Purpose:</strong> Essential security and user
                  authentication
                </p>
                <p>
                  <strong>Duration:</strong> Session cookies (deleted when you
                  close your browser) and persistent cookies (up to 30 days)
                </p>
              </div>
            </div>

            {/* Turnstile cookies */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="card-subheading mb-2">CAPTCHA Security Cookies</h3>
              <p className="detail-text mb-2">
                These cookies are set by Cloudflare Turnstile to protect our
                forms from spam and automated attacks. They verify that form
                submissions are made by real users.
              </p>
              <div className="detail-text text-gray-600">
                <p>
                  <strong>Purpose:</strong> Essential security and spam
                  protection
                </p>
                <p>
                  <strong>Duration:</strong> Short-term (typically a few
                  minutes)
                </p>
                <p>
                  <strong>Third party:</strong> Cloudflare
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="card-heading mb-4">Your rights</h2>
          <p className="detail-text">
            Since these cookies are strictly necessary for the website to
            function, they cannot be disabled. However, you can delete cookies
            through your browser settings. Please note that disabling or
            deleting these cookies may prevent you from using certain features
            of our website.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="detail-text text-gray-600">
            This policy complies with the Privacy and Electronic Communications
            Regulations (PECR). For questions about our cookie use, please
            contact us.
          </p>
        </div>
      </div>
    </div>
  );
}

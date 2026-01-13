import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function CookiePolicy() {
  return (
    <div className="space-y-4 sm:w-xl lg:w-3xl xl:w-4xl">
      <Heading variant="h1">Cookie Notice</Heading>

      <div className="space-y-6">
        <Text>
          Our website uses strictly necessary cookies to provide essential
          functionality. No consent is required for these cookies as they are
          essential for the website to work properly.
        </Text>

        <div>
          <Heading variant="h2" className="mb-4">
            Cookies we use
          </Heading>
          <div className="space-y-4">
            {/* Authentication cookies */}
            <div className="rounded-lg bg-gray-50 p-4">
              <Heading variant="h3" className="mb-2">
                Authentication Cookies
              </Heading>
              <Text className="mb-2">
                These cookies are essential to keep you logged in and secure
                your account. They remember your login status and protect
                against unauthorised access.
              </Text>{' '}
              <Text>
                <span className="font-bold">Purpose:</span> Essential security
                and user authentication
              </Text>{' '}
              <Text>
                <span className="font-bold">Duration:</span> Session cookies
                (deleted when you close your browser) and persistent cookies (up
                to 30 days)
              </Text>{' '}
            </div>

            {/* Turnstile cookies */}
            <div className="rounded-lg bg-gray-50 p-4">
              <Heading variant="h3" className="mb-2">
                CAPTCHA Security Cookies
              </Heading>
              <Text className="mb-2">
                These cookies are set by Cloudflare Turnstile to protect our
                forms from spam and automated attacks. They verify that form
                submissions are made by real users.
              </Text>{' '}
              <Text>
                <span className="font-bold">Purpose:</span> Essential security
                and spam protection
              </Text>{' '}
              <Text>
                <span className="font-bold">Duration:</span> Short-term
                (typically a few minutes)
              </Text>{' '}
              <Text>
                <span className="font-bold">Third party:</span> Cloudflare
              </Text>{' '}
            </div>
          </div>
        </div>

        <div>
          <Heading variant="h2" className="mb-4">
            Your rights
          </Heading>
          <Text>
            Since these cookies are strictly necessary for the website to
            function, they cannot be disabled. However, you can delete cookies
            through your browser settings. Please note that disabling or
            deleting these cookies may prevent you from using certain features
            of our website.
          </Text>{' '}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <Text>
            This policy complies with the Privacy and Electronic Communications
            Regulations (PECR). For questions about our cookie use, please
            contact us.
          </Text>{' '}
        </div>
      </div>
    </div>
  );
}

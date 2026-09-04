import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
export const metadata: Metadata = { title: "Privacy Policy", description: "How InterviewPrep collects, uses, and protects your information.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
	return (
		<LegalPage title="Privacy policy" lastUpdated="September 2, 2026" intro="InstantInterviewPrep is a free website for practicing interview questions, learning interview concepts, and preparing for job conversations. This policy explains what information may be collected, how it is used, stored, and protected. By using the website, you accept this policy and the other applicable terms for the features you use.">
			<h2>Information we collect</h2>
			<h3>Information you provide</h3>
			<p>Some features require an account. When you register or update your profile, you may provide your email address, name, password, target role, experience level, daily goal, and preferred technologies. Your account can also be associated with information returned by Google if you choose Google sign-in and that option is configured.</p>
			<p>When you use signed-in features, we store the content and activity needed to provide them, such as saved questions, learning progress, practice answers and results, daily challenge activity, and resumes you create. You choose what to enter into those features. Please do not submit passwords, API keys, or other sensitive information as an interview answer, resume, or support message.</p>

			<h3>Information collected automatically</h3>
			<p>When you visit or use the website, normal web requests and our security controls may process technical information such as your IP address, browser and device characteristics, requested pages, referring page, and date and time. We use this information as needed to deliver pages, apply rate limits, debug problems, and prevent abuse. The site also includes Vercel Analytics to help us understand aggregate website usage and performance; Vercel may process related technical information under its own policies.</p>

			<h3>Cookies and browser storage</h3>
			<p>We use cookies and similar browser technologies for essential operation. NextAuth uses authentication cookies to maintain a secure signed-in session, and practice sessions use local browser storage to preserve an in-progress draft. Advertising technologies may use cookies if advertising is enabled. See our <a href="/cookie-policy">Cookie Policy</a> for details.</p>

			<h2>How we use information</h2>
			<ul>
				<li>Provide, operate, and maintain the website and its content.</li>
				<li>Create and manage accounts, authenticate users, and keep account features private.</li>
				<li>Provide interview preparation, learning, practice, progress, daily challenge, saved-content, and resume features that users request.</li>
				<li>Improve website functionality, content quality, and reliability.</li>
				<li>Protect the website and users through security checks, rate limiting, debugging, fraud prevention, and abuse prevention.</li>
				<li>Understand operational usage and performance through account activity and application data, where needed to provide and improve the service.</li>
				<li>Display and measure advertising if third-party advertising is enabled.</li>
			</ul>

			<h2>Cookies and similar technologies</h2>
			<p>Our current use falls into these categories:</p>
			<ul>
				<li><strong>Essential cookies:</strong> cookies and browser storage needed for core site behavior, including keeping an in-progress practice draft.</li>
				<li><strong>Authentication and session cookies:</strong> used by NextAuth when you sign in so protected features can recognize your session.</li>
				<li><strong>Preference and functionality storage:</strong> the application may retain information locally when a feature needs to remember your in-progress work. It does not currently advertise a separate preference-cookie system.</li>
				<li><strong>Analytics:</strong> the site includes Vercel Analytics for aggregate usage and performance information. We do not use it to intentionally collect the content of your answers or resume fields.</li>
				<li><strong>Advertising cookies:</strong> if advertising is enabled, Google or another advertising provider may use cookies or similar technologies to serve, personalize, and measure ads as described below.</li>
			</ul>
			<p>You can control or disable cookies and local browser storage through your browser settings. Blocking essential cookies may prevent sign-in or other account features from working. More information is available in the <a href="/cookie-policy">Cookie Policy</a>.</p>

			<h2>Advertising and Google AdSense</h2>
			<p>InstantInterviewPrep may display advertisements from third-party advertising providers such as Google AdSense. Advertising is enabled only when the required site configuration is turned on; it is currently disabled in the application configuration used for this site.</p>
			<p>If advertising is enabled, Google and its partners may use cookies or similar technologies to serve, personalize, measure, or improve advertisements based on visits to this and other websites. In particular, Google may use the DoubleClick DART cookie to serve ads based on your visits to this site and other sites on the internet. Advertising may be contextual or personalized depending on your settings, consent, location, and applicable requirements. Advertising providers may collect or receive information about your visits for these purposes.</p>
			<p>You can manage personalized advertising through <a href="https://adssettings.google.com/" rel="noreferrer">Google Ads Settings</a> and learn more from <a href="https://policies.google.com/technologies/ads" rel="noreferrer">Google's advertising privacy information</a>. Your browser and available regional privacy controls may also provide choices. Turning off personalized advertising does not necessarily prevent ads from being shown.</p>

			<h2>Third-party services</h2>
			<p>The application uses or is configured to use the following service categories:</p>
			<ul>
				<li><strong>Database:</strong> a PostgreSQL database, accessed through Prisma, stores account and feature data.</li>
				<li><strong>Authentication:</strong> NextAuth manages sessions, and Google OAuth may be available when the site operator configures Google sign-in. Email-and-password sign-in is also supported.</li>
				<li><strong>Advertising:</strong> Google AdSense is supported but only loads when the site's AdSense settings enable it.</li>
			</ul>
			<p>Vercel Analytics and hosting providers may process request and usage information as necessary to provide analytics, hosting, and content delivery. Their processing is governed by their own policies and the deployment environment.</p>

			<h2>Data sharing</h2>
			<p>We do not sell personal information. We may share or permit access to information only when reasonably necessary to:</p>
			<ul>
				<li>Provide website functionality through trusted service providers, such as database, authentication, hosting, and delivery infrastructure.</li>
				<li>Comply with a legal obligation or valid legal process.</li>
				<li>Protect the security, rights, and property of the website, its users, or others.</li>
				<li>Support advertising services, or analytics services if one is added, where applicable and legally permitted.</li>
			</ul>

			<h2>Data retention</h2>
			<p>We retain account and feature information for as long as the account remains active or as needed to provide the requested features. Retention can also depend on operational needs, backup cycles, legal obligations, and security or abuse-prevention requirements. We do not promise a fixed retention period where the application does not define one.</p>

			<h2>Data security</h2>
			<p>We use reasonable technical and organizational measures appropriate to the service, including authenticated access controls, password hashing, signed sessions, request limits, and security headers. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>

			<h2>Your rights and choices</h2>
			<ul>
				<li>You can review or update available account and profile information through your account features.</li>
				<li>You can request help with access, correction, or deletion of account information by contacting us. We may need to verify the request.</li>
				<li>You can control cookies and local storage through your browser settings, subject to the functionality limits described above.</li>
				<li>If advertising is enabled, you can manage Google's advertising personalization controls through the settings linked above.</li>
			</ul>

			<h2>Children's privacy</h2>
			<p>InstantInterviewPrep is intended for people preparing for interviews and is not directed to children. We do not knowingly seek personal information from children. If you believe a child has provided personal information, please contact us so we can review the request.</p>

			<h2>International users</h2>
			<p>The website is accessible from different countries. Information may be processed by our service providers in the countries or locations where they operate. Local privacy protections may differ from those in your country.</p>

			<h2>Changes to this policy</h2>
			<p>We may update this policy periodically as the website or its services change. When material changes are made, we will change the "Last updated" date near the top of this page. Continued use of the website after an update means the updated policy applies to your use of the website.</p>

			<h2>Contact</h2>
			<p>For privacy questions, access or deletion requests, or concerns about this policy, email <a href="mailto:instantinterviewprep@gmail.com">instantinterviewprep@gmail.com</a>. Please do not include passwords, API keys, or other sensitive information.</p>
		</LegalPage>
	);
}

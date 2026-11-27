const currentYear = () => new Date().getFullYear();

export const siteConfig = {
  name: "SiteOrbit",
  tagline: "Website builder for teams",
  description:
    "SiteOrbit is a website builder for teams. Each client gets its own workspace, its own domain and its own analytics.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://site-orbit-beta.vercel.app",
  links: {
    github: "https://github.com/UzomaN-Hub",
    linkedin: "https://linkedin.com/in/uzoma-nwaiwu",
  },
  /**
   * Where "Contact sales" goes. Set NEXT_PUBLIC_CONTACT_EMAIL to use a mailto
   * link; until then it falls back to LinkedIn, the one real contact channel.
   */
  contactHref: process.env.NEXT_PUBLIC_CONTACT_EMAIL
    ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`
    : "https://linkedin.com/in/uzoma-nwaiwu",
  currentYear,
} as const;

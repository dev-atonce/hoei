import type { Viewport } from "next";
import { ConfigProvider } from "antd";
import FetchProvider from "@/contexts/FetchContext";
import PageSettingProvider from "@/contexts/PageSettingContext";
import "./globals.css";
import Header from "@/components/main/Header/Header";
import Footer from "@/components/main/Footer/Footer";
import { Kanit } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";
import Favicon from "../../../public/favicon.ico";
import { GoogleTagManager } from "@next/third-parties/google";

const roboto = Kanit({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const fetchLogo = async () => {
  const header = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/logo/header`,
    { cache: "no-store" }
  );
  const footer = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/logo/footer`,
    { cache: "no-store" }
  );

  return { header: await header.json(), footer: await footer.json() };
};

const fetchContact = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/contact-lists`,
    { cache: "no-store" }
  );

  return res?.json();
};

const pageName = "home";
export const ico: Metadata = {
  title: "favicon",
  description: "By Owner",
  icons: [{ rel: "icon", url: Favicon.src }],
};
export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const lng = "TH";

  const seoRoute = `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/seo/page-name/${pageName}`;

  // fetch data
  const response = await fetch(seoRoute, { cache: "no-store" }).then((res) =>
    res.json()
  );

  return {
    metadataBase: new URL("https://xn--12cbgmf3hf0eafgd0k0bkj2g0h9fna.net"),
    title: response[`seoTitle${lng}`],
    description: response[`seoDescription${lng}`],
    keywords: response[`seoKeyword${lng}`],
    alternates: {
      canonical: "./",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logos = await fetchLogo();
  const contact = await fetchContact();

  return (
    <html lang="th">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: roboto.style.fontFamily,
          },
        }}
      >
        <FetchProvider>
          <PageSettingProvider>
            <body className={roboto.className}>
              <Header logo={logos?.header?.image} contact={contact} />
              {children}
              <Footer logo={logos?.footer?.image} contact={contact} />
            </body>
            <GoogleTagManager gtmId="GTM-5KQVHCL8" />
          </PageSettingProvider>
        </FetchProvider>
      </ConfigProvider>
    </html>
  );
}

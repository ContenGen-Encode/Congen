import CustomSidebar from "@/components/sidebar";
import { RBBTProvider } from "rbbt-client/next";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <RBBTProvider
          config={{
            url: process.env.RBBT_WS_URL!,
            vhost: process.env.RBBT_VHOST!,
            username: process.env.RBBT_USERNAME!,
            password: process.env.RBBT_PASSWORD!,
          }}
        >
          <CustomSidebar>{children}</CustomSidebar>
        </RBBTProvider>
      </body>
    </html>
  );
}

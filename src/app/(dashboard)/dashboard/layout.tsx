
import "../../globals.css";
import DashboardSideWrapper from "~/components/dashboard/DashboardSideWrapper";


//export const metadata: Metadata = await MetaTag()

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
     

        <div className="lg:flex  "  >
<DashboardSideWrapper/>
        {children}
        </div>
    );
}

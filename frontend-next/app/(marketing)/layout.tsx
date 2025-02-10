import { Header } from "@/components/Header";


export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

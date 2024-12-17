import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/nav";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                  crossOrigin="anonymous"/>
            <meta name="theme-color" content="#319197" media="(prefers-color-scheme: light)"/>
            <meta name="theme-color" content="#872e4e" media="(prefers-color-scheme: dark)"/>
            {/*<meta name="viewport" content="viewport-fit=cover"/>*/}
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div>
            {children}
            <Nav/>
        </div>
        </body>
        </html>
    );
}

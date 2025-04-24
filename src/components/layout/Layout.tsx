
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-green-800 to-green-700 h-1 sm:h-2 w-full" />
      <Header />
      <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

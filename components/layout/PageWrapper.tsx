import Navbar from './Navbar';
import Footer from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-[72px]" id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

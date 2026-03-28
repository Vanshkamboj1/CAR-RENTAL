import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 🔥 Navbar */}
      <Navbar />

      {/* 🔥 Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 🔥 Footer */}
      <Footer />

    </div>
  );
}

export default AppLayout;
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-green-50  to-emerald-50">
        <div className="relative z-10 h-full overflow-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;

import { Outlet } from "react-router";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <SiteHeader />
      <main className="flex-1 pb-16 pt-10">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default AppLayout;

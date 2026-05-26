import { supabase } from "@/lib/supabase";

import AuthGuard from "@/components/dashboard/AuthGuard";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminManagementClient from "@/components/dashboard/AdminManagementClient";

export default async function AdminManagementPage() {
  const { data: admins, error } = await supabase
    .from("admins")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
  }

  const safeAdmins = admins || [];

  return (
    <AuthGuard allowedRole="superadmin">
      <main className="min-h-screen bg-[#F5F5F5] flex">
        <Sidebar />

        <section className="flex-1 p-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">
              Admin Management
            </h1>

            <p className="text-gray-500 mt-2">
              Kelola akun admin sistem
            </p>
          </div>

          <AdminManagementClient admins={safeAdmins} />
        </section>
      </main>
    </AuthGuard>
  );
}
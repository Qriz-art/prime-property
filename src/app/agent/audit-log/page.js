import { supabase } from "@/lib/supabase";

import AuthGuard from "@/components/dashboard/AuthGuard";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function AuditLogPage() {
  const { data: logs, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
  }

  const safeLogs = logs || [];

  return (
    <AuthGuard allowedRole="superadmin">
      <main className="min-h-screen bg-[#F5F5F5] flex">
        <Sidebar />

         <section className="p-8 md:ml-72 w-full">
  <div className="w-full">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">
              Audit Log
            </h1>

            <p className="text-gray-500 mt-2">
              Aktivitas sistem property
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[#1A1A1A]">
                <thead className="bg-[#F5F5F5]">
                  <tr className="text-left">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Tanggal</th>
                  </tr>
                </thead>

                <tbody>
                  {safeLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-t border-gray-200"
                    >
                      <td className="px-6 py-4">
                        {log.user_email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-[#C9A961]/20 text-[#8A6A2A] px-3 py-1 rounded-full text-sm font-semibold">
                          {log.action}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {log.property_name || "-"}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(log.created_at).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}

                  {safeLogs.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        Belum ada audit log.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
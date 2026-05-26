import { supabase } from "@/lib/supabase";

import AuthGuard from "@/components/dashboard/AuthGuard";
import ClientDashboard from "@/components/dashboard/ClientDashboard";

export default async function DashboardPage() {
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
  }

  const safeProperties = properties || [];

  return (
    <AuthGuard>
      <ClientDashboard properties={safeProperties} />
    </AuthGuard>
  );
}
import { getAllTickets } from "@/actions/ticket.actions";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import AdminTicketItem from "@/components/AdminTicketItem";

const AdminDashboard = async () => {
  const user = await getCurrentUser();

  if (user?.role !== "admin") {
    redirect("/");
  }

  const tickets = await getAllTickets();

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-3xl font-bold text-blue-600 mb-8 text-center'>Admin Dashboard</h1>
      {tickets.length === 0 ? (
        <p className='text-center text-gray-600'>No Tickets Yet</p>
      ) : (
        <div className='space-y-4 max-w-3xl mx-auto'>
          {tickets.map((ticket) => (
            <AdminTicketItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

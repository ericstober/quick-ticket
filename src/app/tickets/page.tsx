import { getMyTickets } from "@/actions/ticket.actions";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import TicketItem from "@/components/TicketItem";

const TicketsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const tickets = await getMyTickets();

  return (
    <div className='min-h-screen p-8'>
      <h1 className='text-3xl font-bold text-purple mb-8 text-center'>Support Tickets</h1>
      {tickets.length === 0 ? (
        <p className='text-center text-gray-600'>No Tickets Yet</p>
      ) : (
        <div className='space-y-4 max-w-3xl mx-auto'>
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsPage;

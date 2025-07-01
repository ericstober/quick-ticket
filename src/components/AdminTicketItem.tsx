import type { Ticket } from "@/generated/prisma";
import { getPriorityClass } from "@/utils/ui";
import Link from "next/link";
import DeleteTicketButton from "./DeleteTicketButton";

type TicketItemProps = {
  ticket: Ticket;
};

const AdminTicketItem = ({ ticket }: TicketItemProps) => {
  const isClosed = ticket.status === "Closed";

  return (
    <div
      key={ticket.id}
      className={`flex justify-between items-center bg-white rounded-lg shadow border border-gray-200 p-6 ${
        isClosed ? "opacity-50" : ""
      }`}
    >
      {/* Left Side */}
      <div>
        <h2 className='text-xl font-semibold text-blue-600'>{ticket.subject}</h2>
      </div>

      {/* Right Side */}
      <div className='text-right space-y-2'>
        <div className='text-sm text-gray-500'>
          Priority: <span className={getPriorityClass(ticket.priority)}>{ticket.priority}</span>
        </div>

        <DeleteTicketButton ticketId={ticket.id} />

        <Link
          href={`/tickets/${ticket.id}`}
          className='inline-block mt-2 text-sm px-3 py-1 rounded hover:bg-blue-700 transition text-center bg-blue-600 text-white'
        >
          View Ticket
        </Link>
      </div>
    </div>
  );
};

export default AdminTicketItem;

"use client";

import { useActionState, useEffect } from "react";
import { closeTicket } from "@/actions/ticket.actions";
import { toast } from "sonner";

const CloseTicketButton = ({ ticketId, isClosed }: { ticketId: number; isClosed: boolean }) => {
  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(closeTicket, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  if (isClosed) {
    return null;
  }

  return (
    <form action={formAction}>
      <input type='hidden' name='ticketId' value={ticketId} />
      <button
        type='submit'
        className='bg-pink text-white p-3 w-full rounded hover:bg-pink-dark transition hover:cursor-pointer'
      >
        Close Ticket
      </button>
    </form>
  );
};

export default CloseTicketButton;

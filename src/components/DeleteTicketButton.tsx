"use client";

import { useActionState, useEffect } from "react";
import { deleteTicket } from "@/actions/ticket.actions";
import { toast } from "sonner";

const DeleteTicketButton = ({ ticketId }: { ticketId: number }) => {
  const initialState = {
    success: false,
    message: "",
  };

  const deleteTicketAction = async (
    state: { success: boolean; message: string },
    payload: { id: string }
  ): Promise<{ success: boolean; message: string }> => {
    return deleteTicket(payload.id);
  };

  const [state, formAction] = useActionState(deleteTicketAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={() => formAction({ id: ticketId.toString() })}>
      <input type='hidden' name='ticketId' value={ticketId} />
      <button
        type='submit'
        className='inline-block mt-2 text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition text-center text-white'
      >
        Delete Ticket
      </button>
    </form>
  );
};

export default DeleteTicketButton;

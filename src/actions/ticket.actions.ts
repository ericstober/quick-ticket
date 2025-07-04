"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { logEvent } from "@/utils/sentry";
import { getCurrentUser } from "@/lib/current-user";

// Create Ticket
export async function createTicket(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      logEvent("Unauthorized ticket creation attempt", "ticket", {}, "warning");

      return { success: false, message: "You must be logged in to create a ticket" };
    }

    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;

    if (!subject || !description || !priority) {
      logEvent("Validation Error: Missing ticket fields", "ticket", { subject, description, priority }, "warning");

      return { success: false, message: "All fields are required" };
    }

    // Create ticket
    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        priority,
        user: {
          connect: { id: user.id },
        },
      },
    });

    // Log in Sentry
    logEvent(`Ticket created successfully: ${ticket.id}`, "ticket", { ticketId: ticket.id }, "info");

    revalidatePath("/tickets");

    return { success: true, message: "Ticket created successfully" };
  } catch (error) {
    logEvent(
      "An error occured while creating the ticket",
      "ticket",
      { formData: Object.fromEntries(formData.entries()) },
      "error",
      error
    );

    return { success: false, message: "An error occured while creating the ticket" };
  }
}

// Get Tickets Owned by Current Logged In User
export async function getMyTickets() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      logEvent("Unauthorized access to ticket list", "ticket", {}, "warning");
      return [];
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    logEvent("Fetched ticket list", "ticket", { count: tickets.length }, "info");

    return tickets;
  } catch (error) {
    logEvent("Error fetching tickets", "ticket", {}, "error", error);

    return [];
  }
}

// Get All Tickets Owned by All Users
export async function getAllTickets() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      logEvent("Unauthorized access to ticket list", "ticket", {}, "warning");
      return [];
    }

    const tickets = await prisma.ticket.findMany({
      orderBy: [{ status: "desc" }, { createdAt: "desc" }],
    });

    logEvent("Fetched ticket list", "ticket", { count: tickets.length }, "info");

    return tickets;
  } catch (error) {
    logEvent("Error fetching tickets", "ticket", {}, "error", error);

    return [];
  }
}

// Get Single Ticket by ID
export async function getTicketById(id: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
    });

    if (!ticket) {
      logEvent("Ticket not found", "ticket", { ticketId: id }, "warning");
    }

    return ticket;
  } catch (error) {
    logEvent("Error fetching ticket details", "ticket", { ticketId: id }, "error", error);
    return null;
  }
}

// Close Ticket
export async function closeTicket(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const ticketId = Number(formData.get("ticketId"));

  if (!ticketId) {
    logEvent("Missing Ticket ID", "ticket", {}, "warning");

    return { success: false, message: "Ticket ID is required" };
  }

  const user = await getCurrentUser();

  if (!user) {
    logEvent("Missing User ID", "ticket", {}, "warning");

    return { success: false, message: "Unauthorized" };
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket || ticket.userId !== user.id) {
    logEvent("Unauthorized ticket close attempt", "ticket", { ticketId, userId: user.id }, "warning");

    return { success: false, message: "You are not authorized to close this ticket" };
  }

  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: "Closed",
    },
  });

  revalidatePath("/tickets");
  revalidatePath(`/tickets/${ticketId}`);

  return { success: true, message: "Ticket closed successfully" };
}

// Delete Ticket
export async function deleteTicket(id: string): Promise<{ success: boolean; message: string }> {
  const user = await getCurrentUser();

  if (user?.role !== "admin") {
    logEvent("Unauthorized ticket deletion attempt", "ticket", {}, "warning");

    return { success: false, message: "You must be an admin to delete a ticket" };
  }

  try {
    await prisma.ticket.delete({
      where: { id: Number(id) },
    });

    logEvent(`Ticket #${id} deleted successfully`, "ticket", { ticketId: id }, "info");

    revalidatePath("/admin");

    return { success: true, message: "Ticket deleted successfully" };
  } catch (error) {
    logEvent("Error deleting ticket", "ticket", { ticketId: id }, "error", error);
    return { success: false, message: "Error deleting ticket" };
  }
}

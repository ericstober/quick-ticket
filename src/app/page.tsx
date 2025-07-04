import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";

const HomePage = () => {
  return (
    <main className='flex flex-col text-center items-center justify-center min-h-screen px-4'>
      <FaTicketAlt className='mx-auto mb-4 text-pink' size={60} />
      <h1 className='text-4xl md:text-5xl font-bold mb-4 text-purple'>Welcome to K-IT Support</h1>
      <p className='text-lg text-gray-600 mb-8'>Fast and simple support ticket management system.</p>

      <div className='flex flex-col md:flex-row gap-4 justify-center animate-slide opacity-0'>
        <Link
          href='/tickets/new'
          className='bg-purple text-white px-6 py-3 rounded shadow hover:bg-purple-dark transition'
        >
          Submit a Ticket
        </Link>
        <Link
          href='/tickets'
          className='bg-pink-light text-gray-700 px-6 py-3 rounded shadow hover:bg-pink-dark transition'
        >
          View Tickets
        </Link>
      </div>
    </main>
  );
};

export default HomePage;

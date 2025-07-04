import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className='bg-purple border-b border-gray-200 px-6 py-4 flex justify-between items-center'>
      <div>
        <Link href='/' className='text-xl font-bold text-purple-light'>
          K-IT Support
        </Link>
      </div>

      <div className='flex items-center space-x-4'>
        {user ? (
          <>
            <Link href='/tickets/new' className='hover:underline text-purple-light transition'>
              New Ticket
            </Link>

            <Link href='/tickets' className='hover:underline text-purple-light transition'>
              My Tickets
            </Link>

            {/* Display AAdmin Dashboard link if the user is an admin */}
            {user.role === "admin" && (
              <Link href='/admin' className='hover:underline text-purple-light transition'>
                Admin Dashboard
              </Link>
            )}

            <LogoutButton />
          </>
        ) : (
          <>
            <Link href='/login' className='text-lavender hover:underline transition'>
              Login
            </Link>

            <Link
              href='/register'
              className='bg-lavender text-purple px-4 py-2 rounded hover:bg-purple-dark hover:text-purple-light transition'
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

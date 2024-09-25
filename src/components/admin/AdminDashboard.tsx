'use client';
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Column definitions
const columns = [
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Credits", key: "credits" },
  { title: "Subscribed", key: "isSubscribed" },
  { title: "Plan Name", key: "planName" },
  { title: "Verified", key: "isVerified" },
  { title: "Created At", key: "createdAt" }, // Add 'Created At' column
];

// Helper function to format date as local date/time
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString(); // This will format the date and time according to the user's local timezone
};

export function UsersTable({
  count,
  users,
}: {
  count: number;
  users: {
    name: string;
    email: string;
    credits: string;
    planName: string;
    isSubscribed: boolean;
    isEmailVerified: boolean;
    createdAt: string;
  }[];
}) {
  return (
    <div className="max-w-screen mx-auto p-4 bg-gray-800 min-h-[500px]">
      <Table className="min-w-full table-auto rounded-lg shadow-md bg-gray-700">
        <TableCaption className="text-lg font-semibold text-gray-300 my-4">
          A list of registered users and their details.
        </TableCaption>
        <TableHeader className="font-bold bg-gray-600">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className="p-3 text-left text-sm font-semibold text-gray-300 uppercase">
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email} className="border-t hover:bg-gray-500">
              <TableCell className="p-3 text-sm text-gray-200">{user.name}</TableCell>
              <TableCell className="p-3 text-sm text-gray-200">{user.email}</TableCell>
              <TableCell className="p-3 text-sm text-gray-200">{user.credits}</TableCell>
              <TableCell className="p-3 text-sm text-gray-200">{user.isSubscribed ? "Yes" : "No"}</TableCell>
              <TableCell className="p-3 text-sm text-gray-200">
                {user.planName && user.isSubscribed ? user.planName : "Free"}
              </TableCell>
              <TableCell className="p-3 text-sm text-gray-200">{user.isEmailVerified ? "Yes" : "No"}</TableCell>
              <TableCell className="p-3 text-sm text-gray-200">{formatDate(user.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-gray-600">
          <TableRow>
            <TableCell colSpan={7} className="p-3 text-right text-sm font-semibold text-gray-300">
              Total Users: {count}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

const AdminDashboard = ({
  users,
  page,
  totalUsers,
}: {
  users: any;
  page: number;
  totalUsers: number;
}) => {
  const totalPage = Math.ceil(totalUsers / 10);
  const router = useRouter();
  const next = () => {
    if (page < totalPage) {
      router.push(`/admin?page=${page + 1}`);
    } else {
      toast.warning("This is the last page", { dismissible: true, duration: 3000 });
    }
  };

  const prev = () => {
    if (page > 1) {
      router.push(`/admin?page=${page - 1}`);
    } else {
      toast.warning("This is the first page", { dismissible: true, duration: 3000 });
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 p-2">
      <h1 className="text-3xl font-bold text-gray-300 mb-4">Users</h1>
      <UsersTable users={users} count={totalUsers} />
      <div className="flex justify-center mt-6">
        <Pagination className="space-x-2">
          <PaginationContent className="flex items-center space-x-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={prev}
                className="px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="px-3 py-2 bg-gray-700 text-gray-300 rounded">{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className="px-2 text-gray-500" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={next}
                className="px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AdminDashboard;

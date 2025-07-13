"use client";

import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";// Adjust paths if needed
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Contact {
  _id: string;
  providerId: {
    firstName: string;
    lastName: string;
    profession: string;
  };
  location: string;
  status: string;
  createdAt: string;
}

const BookingsTable = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit = 4;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/contacts/all-contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setContacts(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };

    fetchContacts();
  }, []);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setStatus(e.target.value);
  };

  const filtered = status
    ? contacts.filter((c) => c.status.toLowerCase() === status.toLowerCase())
    : contacts;

  const paginated = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card className="shadow-none rounded-sm">
        <CardContent className="py-2 px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Service Bookings</h2>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border px-3 py-2 rounded text-sm"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-none rounded-sm">
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {contact.providerId?.firstName} {contact.providerId?.lastName}
                    </TableCell>
                    <TableCell>{contact.providerId?.profession}</TableCell>
                    <TableCell>{contact.location}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          contact.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : contact.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : contact.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {contact.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {contact.status === "pending" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log("Delete booking", contact._id)}
                          className="text-red-600 cursor-pointer hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash size={16} />
                        </Button>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          ✅ Done
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={page <= 1 ? "pointer-events-none opacity-50 cursor-pointer" : "cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm pt-[6px] px-4">
              Page {page} of {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={page >= totalPages ? "pointer-events-none opacity-50 cursor-pointer" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BookingsTable;

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableFooter,
  TableHeader,
  TableCell,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

export default function PsTable() {
  return (
    <div>
      <Table>
        <TableCaption>List Acumalaka</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Acumalaka</TableCell>
            <TableCell>Email@gmail.com</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

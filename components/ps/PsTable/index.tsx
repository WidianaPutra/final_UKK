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

type PsTablePropTypes = {
  children: React.ReactNode;
  headerDatas: Array<string | null>;
  tableCaption?: string;
};

export default function PsTable({
  children,
  headerDatas,
  tableCaption,
}: PsTablePropTypes) {
  return (
    <div>
      <Table>
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader>
          <TableRow>
            {headerDatas?.map((data: any, i: number) => (
              <TableHead key={i}>{data}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {children}
        {/* <TableBody></TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}

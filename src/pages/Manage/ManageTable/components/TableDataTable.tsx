import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { tableStatus } from '@/constants/tableStatus'
import DialogDeleteTable from '@/pages/Manage/ManageTable/components/DialogDeleteTable'
import DialogTable from '@/pages/Manage/ManageTable/components/DialogTable'
import { Table as TableType } from '@/types/table.type'
import { generateQRCode } from '@/utils/utils'

interface Props {
  readonly tables: TableType[]
}

export default function TableDataTable({ tables }: Props) {
  return (
    <Table className='font-semibold'>
      <TableHeader>
        <TableRow>
          <TableHead>Số bàn</TableHead>
          <TableHead>Sức chứa</TableHead>
          <TableHead>Hiện đang ngồi</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>QR</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tables.map((table) => {
          const url = `http://localhost:3000/table/${table.table_number}?token=${table.token}`
          return (
            <TableRow key={table._id}>
              <TableCell>{table.table_number}</TableCell>
              <TableCell>{table.capacity}</TableCell>
              <TableCell>{table.current}</TableCell>
              <TableCell>{tableStatus[table.status]}</TableCell>
              <TableCell>
                <img src={generateQRCode(url)} alt='qr-code' />
              </TableCell>
              <TableCell className='space-x-2'>
                <DialogTable table={table} />
                <DialogDeleteTable table_id={table._id} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

import React from "react";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import type { NewsArticle } from "../type/NewsArticle";


interface Props {
  articles: NewsArticle[];
}

const columns: ColumnDef<NewsArticle>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <a href={row.original.url} target="_blank" rel="noopener noreferrer">
        {row.original.title}
      </a>
    ),
  },
  {
    accessorKey: "source.name",
    header: "Source",
  },
  {
    accessorKey: "publishedAt",
    header: "Published At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
];

const NewsTable: React.FC<Props> = ({ articles }) => {
  const table = useReactTable({
    data: articles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder ? null : 
                  typeof header.column.columnDef.header === "function"
                  ? header.column.columnDef.header(header.getContext())
                  : header.column.columnDef.header}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {typeof cell.column.columnDef.cell === "function"
                  ? cell.column.columnDef.cell(cell.getContext())
                  : cell.getValue()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NewsTable;

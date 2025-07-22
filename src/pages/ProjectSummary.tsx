// src/pages/NewsSummary.tsx

import { useMemo } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type ProjectInfo = {
  label: string;
  description: string;
};

/**
 * Static data for displaying project details in a TanStack Table.
 * This includes student info, project features, technology stack, and description.
 */
const staticData: ProjectInfo[] = [
  { label: "Student Name", description: "SUBEDI RABIN" },
  { label: "Student ID", description: "M25w0465" },
  { label: "College Name", description: "The Kyoto College of Graduate Studies for Informatics" },
  { label: "Semester", description: "1st Semester" },
  { label: "Project Name", description: "News Summary App" },
  { label: "Technology", description: "React, TypeScript, Tailwind CSS" },
  {
    label: "Feature",
    description: `
- Latest news fetched from API
- Category-based filtering (e.g., Technology, Business, Health, Sports)
- News search functionality
- Responsive and clean UI with Tailwind CSS
- Displayed Data in structured table format using TanStack Table
- Loading indicator while fetching news
- Store Data in Local Storage using Zustand 
- Links to full news articles
- Smooth user experience on desktop and mobile
    `.trim(),
  },
  {
    label: "Description",
    description:
      "Daily News Portal is a modern and lightweight news application designed to keep users updated with the latest global headlines. Built with React.js (TypeScript) and styled using Tailwind CSS, the app leverages NewsAPI to fetch categorized news in real time. Users can explore trending news, filter by categories like Technology, Health, or Business, and perform keyword-based searches. Designed for daily readers and information seekers, this application will feature a clean UI, responsive layout, and smooth user experience across devices.",
  },
  { label: "Data Source", description: "GNews API" },
];

/**
 * ProjectSummary Component
 * - Displays project-related static information in a structured table.
 * - Uses TanStack React Table for rendering data.
 */
const ProjectSummary = () => {
  /**
   * Define table columns for "Label" and "Description".
   * useMemo ensures the column definitions are not recreated on every render.
   */
  const columns = useMemo<ColumnDef<ProjectInfo>[]>(
    () => [
      {
        header: "Label",
        accessorKey: "label",
        cell: ({ getValue }) => (
          <span className="font-semibold text-gray-700">
            {getValue<string>()}
          </span>
        ),
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }) => (
          <pre className="whitespace-pre-wrap text-gray-600 leading-relaxed text-sm">
            {getValue<string>()}
          </pre>
        ),
      },
    ],
    []
  );

  /**
   * Initialize TanStack Table instance with the static project data.
   */
  const table = useReactTable({
    data: staticData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
        About This Project
      </h1>

      {/* Responsive table container */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            {/* Render table headers */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-blue-50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-blue-700 uppercase tracking-wide select-none
                      ${
                        header.column.id === "label"
                          ? "min-w-[180px] max-w-[250px]"
                          : ""
                      }
                    `}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {/* Render table rows */}
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-100 transition-colors duration-150`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`border border-gray-200 px-6 py-4 text-sm align-top
                      ${
                        cell.column.id === "label"
                          ? "min-w-[180px] max-w-[250px] font-semibold text-gray-700"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectSummary;

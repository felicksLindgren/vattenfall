"use client"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ColumnDef } from "@tanstack/react-table"
import { EyeIcon, MoreHorizontal } from "lucide-react"

export type ManualCheck = {
    id: string
    errorCode: 202
    process: "QA"
    subProcess: "Import"
    from: "EcoStx"
    facilityId: string
    meterId: string
    user: string
}

export const columns: ColumnDef<ManualCheck>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="DokumentID" />
        ),
    },
    {
        accessorKey: "errorCode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Felkod" />
        ),
        cell: ({ row }) => {
            const errorCode = row.getValue<ManualCheck["errorCode"]>("errorCode")

            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>Fel {errorCode}</TooltipTrigger>
                        <TooltipContent>
                            <p>Info text</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        }
    },
    {
        accessorKey: "process",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Process" />
        ),
    },
    {
        "accessorKey": "subProcess",
        "header": ({ column }) => (
            <DataTableColumnHeader column={column} title="Subprocess" />
        ),
    },
    {
        "accessorKey": "from",
        "header": ({ column }) => (
            <DataTableColumnHeader column={column} title="Från" />
        ),
    },
    {
        "accessorKey": "facilityId",
        "header": ({ column }) => (
            <DataTableColumnHeader column={column} title="AnläggningsID" />
        ),
    },
    {
        "accessorKey": "meterId",
        "header": ({ column }) => (
            <DataTableColumnHeader column={column} title="MätarID/Register" />
        ),
    },
    {
        "accessorKey": "user",
        "header": ({ column }) => (
            <DataTableColumnHeader column={column} title="Användare" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const manualCheck = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(manualCheck.id)}
                        >
                            Copy manual check ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>View user</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    {
        id: "sheet",
        cell: ({ row }) => {
            return (
                (
                    <Sheet>
                        <SheetTrigger asChild>
                            <EyeIcon cursor={'pointer'} className="h-4 w-4" />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                )
            )
        }
    }
];
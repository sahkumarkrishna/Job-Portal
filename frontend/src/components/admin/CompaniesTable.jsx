import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies?.filter(company =>
      !searchCompanyByText ||
      company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[640px]">
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map(company => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;

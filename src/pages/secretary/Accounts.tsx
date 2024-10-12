import { title } from '@/components/primitives';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Users } from 'lucide-react';
import AccountsTable from '@/components/tables/AccountTables';

const Accounts = () => {
  return (
    <div className="flex flex-col gap-6 items-start">
      <h1 className={title()}>Accounts</h1>
      <div className="flex flex-row flex-wrap gap-6 w-full justify-start">
        {/* Optometrists Card */}
        <Card className="flex flex-1 max-w-[400px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg transition-transform transform hover:scale-105">
          <CardHeader className="flex gap-3 items-center">
            <Users className="w-8 h-8 text-white" />
            <p className="text-xl font-semibold">Optometrists</p>
          </CardHeader>
          <CardBody>
            <p className="text-5xl font-bold">45</p>
            <p className="text-sm font-normal">Total Optometrists</p>
          </CardBody>
        </Card>

        {/* Students Card */}
        <Card className="flex flex-1 max-w-[400px] bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white shadow-lg transition-transform transform hover:scale-105">
          <CardHeader className="flex gap-3 items-center">
            <Users className="w-8 h-8 text-white" />
            <p className="text-xl font-semibold">Students</p>
          </CardHeader>
          <CardBody>
            <p className="text-5xl font-bold">89</p>
            <p className="text-sm font-normal">Total Students</p>
          </CardBody>
        </Card>
        {/* Patients Card */}
        <Card className="flex flex-1 max-w-[400px] bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white shadow-lg transition-transform transform hover:scale-105">
          <CardHeader className="flex gap-3 items-center">
            <Users className="w-8 h-8 text-white" />
            <p className="text-xl font-semibold">Patients</p>
          </CardHeader>
          <CardBody>
            <p className="text-5xl font-bold">121</p>
            <p className="text-sm font-normal">Total Patients</p>
          </CardBody>
        </Card>
      </div>
      <AccountsTable />
    </div>
  );
};

export default Accounts;

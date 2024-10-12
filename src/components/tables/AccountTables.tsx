import { useCallback, useState } from 'react';
import { useUserList } from '@/hooks/userList';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Skeleton, User, Button, Input, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Avatar, DateInput, Autocomplete, AutocompleteItem, Tooltip, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { accountColumns } from "@/config/data";
import { capitalize } from '@/lib/utils';
import moment from 'moment';
import { Key } from 'swr';
import { DeleteDocumentIcon, EditDocumentIcon, EyeFilledIcon, SearchIcon } from '../icons';
import CreateAccount from '../forms/CreateAccount';
import axios from 'axios';
import { Calendar, GitPullRequestCreateArrow, Phone } from 'lucide-react';
import { DotLoaderOverlay } from "react-spinner-overlay";
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { CalendarDate, DateValue, getLocalTimeZone, parseDate, } from '@internationalized/date';
import { useUser } from '@clerk/clerk-react';

const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;
const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
]
const AccountTables = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { users, loading, totalCount } = useUserList(page);
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to store selected user details
  const [editable, setEditable] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [, setSelectedGender] = useState("")
  const [birthdate, setBirthdate] = useState<DateValue | null>(null);
  const { user } = useUser()
  type User = typeof users[0];
  const { register, setValue, handleSubmit, clearErrors, reset, formState: { errors } } = useForm<User>()

  const totalPages = Math.ceil(totalCount / 10);

  // Filter users based on the search query
  const filteredUsers = users.filter((user: { name: string; email: string; }) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle view account action
  const viewAccount = useCallback(async (user: User) => {
    setIsSaving(true)
    setEditable(true)
    try {
      // Fetch user details from the backend
      const response = await axios.get(`${BACKEND_API}/api/get-account/${user.id}`);
      setSelectedUser(response.data); // Set the selected user data from the response
      const userObject: User = response.data
      console.log("userObject", userObject)
      reset({
        ...userObject,
        gender: userObject.gender,
        house_number: userObject.address.house_number,
        barangay: userObject.address.barangay,
        city_municipality: userObject.address.city_municipality,
        province: userObject.address.province,
        zip_code: userObject.address.zip_code,
      });
      setBirthdate(parseDate(moment(userObject.birthdate).format("YYYY-MM-DD"))); // Convert to CalendarDate
      onOpen(); // Open the modal
    } catch (error) {
      console.log("Error fetching user details:", error);
      toast.error("Please check your internet connection")
    } finally {
      setIsSaving(false)

    }

  }, [onOpen, reset]); // Add dependencies here

  const onUpdateAccount = async (data: User) => {
    setIsSaving(true)

    if (!birthdate) {
      toast.error("Please add birthdate.")
    }

    await axios.put(`${BACKEND_API}/api/update/account`, {
      ...data, user_id: selectedUser.user_id,
      birthdate: moment(birthdate).format()
    }).then((response) => {
      toast.success(response.data.updateStatus);
      onClose();
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsSaving(false)
    })
  }

  const onDeleteAccount = async (user_id: string) => {
    setIsSaving(true)
    const deleter_user_id = user?.id
    try {
      const response = await axios.delete(`${BACKEND_API}/api/delete/account/${deleter_user_id}/${user_id}`)
      toast.success(response.data.message)
      onClose()
      setTimeout(() => {
        setIsSaving(false)
      }, 2000);
    } catch (error) {
      console.log(error)
      toast.error("Error")
      setIsSaving(false)
    }
  }
  const handleCancel = () => {
    setEditable(!editable)//Disable editing
    clearErrors(); // Clears all errors
    reset(); // Optionally reset the form to its initial state if needed
  };

  const renderCell = useCallback((user: User, columnKey: Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User name={user.name} description={capitalize(user.role)} avatarProps={{ src: user.avatar }} />
        );
      case "email":
        return (
          <p>{user.email}</p>
        );
      case "lastsignedin":
        return (
          <p>{user.lastSignedIn ? moment(user.lastSignedIn).calendar() : "-"}</p>
        );
      case "createdat":
        return (
          <p>{moment(user.createdAt).format("D MMMM yyyy")}</p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Account">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => viewAccount(user)}>
                <EyeFilledIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Account">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  viewAccount(user);
                  setEditable(false);
                }}>
                <EditDocumentIcon />
              </span>
            </Tooltip>
            <Tooltip content="Delete accoount" color='danger'>
              <div>
                <Popover showArrow placement="bottom" backdrop='opaque' >
                  <PopoverTrigger>
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteDocumentIcon />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="p-4">
                    <div>
                      <h1 className='text-md mb-4'>Delete <strong>{user.name}</strong>?</h1>
                    </div>
                    <Button className='w-full' color='danger' onClick={() => onDeleteAccount(user.user_id)} isLoading={isSaving}>Confirm</Button>
                    <p className='text-xs text-default-600 mt-4'>Press anywhere to cancel.</p>
                  </PopoverContent>
                </Popover>
              </div>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, viewAccount]);

  return (
    <div className='w-full'>
      <div className="flex flex-row justify-between items-center mb-4 mt-4">
        <Skeleton isLoaded={!loading} className='rounded-2xl'>
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={
              <SearchIcon />
            }
          />
        </Skeleton>
        <CreateAccount />
      </div>
      <Skeleton isLoaded={!loading} className='rounded-2xl'>
        <Table
          aria-label='table sheet for accounts'
          isHeaderSticky
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={totalPages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
            emptyWrapper: "max-w-[100px]",
          }}
        >
          <TableHeader columns={accountColumns}>
            {(column) => (
              <TableColumn key={column.key} align={"start"}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No rows to display."} items={filteredUsers}>
            {(item) => (
              <TableRow key={item?.name}>
                {(columnKey) => (<TableCell>{renderCell(item, columnKey)}</TableCell>)}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Skeleton>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size='2xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onUpdateAccount)}>
                <ModalHeader className='my-4'>
                  <div className='flex flex-row w-full justify-between'>
                    <div className='flex flex-row gap-4'>
                      <Avatar radius='sm' src={selectedUser?.image_url} className='w-[100px] h-[100px]' />
                      <div className='flex flex-col'>
                        <p className='text-lg font-bold'>{selectedUser ? `${selectedUser.firstName} ${selectedUser.middleName} ${selectedUser.lastName}` : "Loading..."}</p>
                        <p className='text-sm font-semibold text-foreground-600'>{selectedUser?.role ? `${capitalize(selectedUser?.role)}` : "Loading..."}</p>
                        <p className='text-sm font-normal text-foreground-600'>{selectedUser?.emailAddress ? `Email: ${selectedUser?.emailAddress}` : "Loading..."}</p>
                        <p className='text-sm font-normal text-foreground-600'>{selectedUser?.createdAt ? `Joined: ${moment(selectedUser.createdAt).format("D MMMM yyyy")}` : "Loading..."}</p>
                      </div>
                    </div>
                    <Button color='success' variant={editable ? 'ghost' : 'solid'} endContent={<EditDocumentIcon />} onPress={() => setEditable(!editable)}>Edit</Button>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className='flex flex-row w-full gap-4'>
                    <Input isInvalid={errors.firstName ? true : false} errorMessage={`${errors.firstName?.message}`} placeholder="First Name" isDisabled={editable} label="First Name" size='md' labelPlacement='outside' variant='bordered' {...register("firstName", { required: "First name is required" })} />
                    <Input isInvalid={errors.middleName ? true : false} errorMessage={`${errors.middleName?.message}`} placeholder="Middle Name" isDisabled={editable} label="Middle Name" size='md' labelPlacement='outside' variant='bordered' {...register("middleName")} />
                    <Input isInvalid={errors.lastName ? true : false} errorMessage={`${errors.lastName?.message}`} placeholder="Last Name" isDisabled={editable} label="Last Name" size='md' labelPlacement='outside' variant='bordered' {...register("lastName", { required: "Last name is required" })} />
                  </div>
                  <div className='flex flex-row w-full gap-4 mt-2'>
                    <Autocomplete
                      endContent={<GitPullRequestCreateArrow />}
                      errorMessage="Gender is required"
                      isDisabled={editable}
                      isInvalid={errors.gender ? true : false}
                      label="Gender"
                      labelPlacement="outside"
                      placeholder="Select Gender"
                      defaultItems={gender}
                      variant="bordered"
                      {...register("gender", {
                        required: "Gender is required",
                        onChange: setSelectedGender
                      })}
                    >
                      {(item) => (
                        <AutocompleteItem key={item.value}>
                          {item.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <DateInput
                      endContent={<Calendar />}
                      isDisabled={editable}
                      isInvalid={errors.birthdate ? true : false}
                      label="Birth Date"
                      labelPlacement="outside"
                      variant="bordered"
                      value={birthdate}
                      onChange={(date) => {
                        setBirthdate(date);
                        setValue("birthdate", date.toDate(getLocalTimeZone()));
                      }}
                      description={`Current birthdate: ${selectedUser.birthdate ? moment(selectedUser?.birthdate).format("MMMM D, yyyy") : "--"}`}
                    />
                  </div>
                  <div className='flex flex-row gap-4 mt-2'>
                    <Input className='flex-1' isDisabled={editable} isInvalid={errors.phone_number ? true : false} errorMessage={`${errors.phone_number?.message}`} label="Contact No" size='md' labelPlacement='outside' variant='bordered' placeholder="Enter phone number" type='numeric' maxLength={11} minLength={11} endContent={<Phone />} {...register("phone_number", { required: "Phone number is required" })} />
                  </div>
                  <p className='mt-2'>Address</p>
                  <div className='flex flex-row w-full gap-4'>
                    <Input isInvalid={errors.house_number ? true : false} errorMessage={`${errors.house_number?.message}`} isDisabled={editable} label="House Street/No." size='md' labelPlacement='outside' variant='bordered' placeholder="House Street/No." {...register("house_number", { required: "House No/Street is required." })} />
                    <Input isInvalid={errors.barangay ? true : false} errorMessage={`${errors.barangay?.message}`} isDisabled={editable} label="Barangay" size='md' labelPlacement='outside' variant='bordered' placeholder="Barangay" {...register("barangay", { required: "Barangay is required." })} />
                    <Input isInvalid={errors.city_municipality ? true : false} errorMessage={`${errors.city_municipality?.message}`} isDisabled={editable} label="City/Municipality" size='md' labelPlacement='outside' variant='bordered' placeholder="City/Municipality" {...register("city_municipality", { required: "City/Municipality is required." })} />
                  </div>
                  <div className='flex flex-row w-full gap-4'>
                    <Input isInvalid={errors.province ? true : false} errorMessage={`${errors.province?.message}`} isDisabled={editable} label="Province" size='md' labelPlacement='outside' variant='bordered' placeholder="Province" {...register("province", { required: "Province is required." })} />
                    <Input isInvalid={errors.zip_code ? true : false} errorMessage={`${errors.zip_code?.message}`} isDisabled={editable} label="Zip Code" size='md' labelPlacement='outside' variant='bordered' placeholder="Zip Code" {...register("zip_code", { required: "Zip Code is required." })} />
                  </div>
                </ModalBody>
                <ModalFooter className='my-2'>
                  {
                    !editable ?
                      (<>
                        <Button color='danger' variant='shadow' className='w-[100px] px-4' onPress={handleCancel}>Cancel</Button>
                        <Button color='primary' variant='shadow' className='w-[100px] px-4' type='submit' isLoading={isSaving}>Save</Button>
                      </>
                      ) :
                      <Button color='danger' variant='solid' onPress={onClose}>Close</Button>
                  }
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      <DotLoaderOverlay loading={loading ? loading : isSaving ? isSaving : false} overlayColor="rgba(0,0,0,0.1)" color='#006FEE' />
    </div >
  );
};

export default AccountTables;

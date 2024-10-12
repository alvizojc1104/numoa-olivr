import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  ModalHeader,
} from "@nextui-org/react";
import { Logo } from "../components/icons";
import { ThemeSwitch } from "./theme-switch";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";


export default function FacultyNavbar() {
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  if (!isLoaded || !user) return null;

  const onLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Navbar maxWidth="xl" position="sticky" className="flex">
        {/* Navbar Brand on the left */}
        <NavbarBrand className="max-w-fit flex items-center gap-2">
          <Logo />
          <p className="font-bold text-inherit">NUOLIVR Faculty</p>
        </NavbarBrand>

        {/* Right Side Content */}
        <NavbarContent as="div" justify="end" className="flex gap-4 items-center">
          <NavbarItem>
            <Link to={"/faculty/my-patients"}>My Patients</Link>
          </NavbarItem>
          <NavbarItem>
            <Tooltip content="Notifications" className="cursor-pointer">
              <Button isIconOnly className="bg-transparent" disableRipple>
                <Bell className="text-gray-500 fill-gray-500" />
              </Button>
            </Tooltip>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <Tooltip content={user.primaryEmailAddress?.emailAddress}>
            <div>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={user.fullName || ""}
                    size="sm"
                    src={user.imageUrl}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2" isReadOnly>
                    <p>Signed in as</p>
                    <p className="font-semibold">{user.primaryEmailAddress?.emailAddress}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={onOpen}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Tooltip>
        </NavbarContent>
      </Navbar>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                Logout
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onLogout}>
                  Log Out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

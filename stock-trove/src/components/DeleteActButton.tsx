import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { deleteUserAccount } from "../servicies/DatabaseAPIClient";
import useAuthUserStore from "../stores/useAuthUser";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";
import { useNavigate } from "react-router-dom";

export const DeleteActButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, logoutUser } = useAuthUserStore();
  const { clear } = useFollowingCompanyQueryStore();
  const navigate = useNavigate();

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleDelete = () => {
    // Handle the deletion logic here
    handleDeleteAccount();
    onClose(); // Close the modal after deletion
  };

  const handleLogout = () => {
    logoutUser();
    clear();
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUserAccount(authUser.email);
      handleLogout();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Delete Account</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Everything in your profile will be deleted.</ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

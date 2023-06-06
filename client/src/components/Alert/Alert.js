import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";

import { Delete } from "@mui/icons-material";
import { useRef } from "react";

const Alert = ({ header, item, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelBtn = useRef();
  return (
    <>
      <Button onClick={onOpen}>
        <Delete />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelBtn}
        onClose={onClose}
        
      >
        <AlertDialogOverlay width="200px">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this {item}?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelBtn} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Alert;

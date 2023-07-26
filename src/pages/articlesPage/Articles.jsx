import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
} from "@chakra-ui/react";

import "../articlesPage/Articles.css";
import Sidebar from "../../components/sidebar/Sidebar";

import { useState } from "react";
import { Items } from "../../../utils/items";

const Articles = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [counter, setCounter] = useState(1); // Counter for generating IDs

  const initialFormInput = {
    itemName: "",
    categoryId: "",
    hasShelfLife: false,
  };

  const [formInput, setFormInput] = useState(initialFormInput);
  const [error, setError] = useState("");
 

  const validateForm = () => {
    if (!formInput.itemName.trim()) {
      return "Please enter Item Name";
    }
    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Process the form submission
    setFormInput(initialFormInput);
    console.log(formInput);
    setError("");
    onClose();
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: newValue,
    }));
  };

  return (
    <div className="articles">
      <Sidebar />

      <div className="table-container">
        <h1>ARTICLES</h1>
        {/* ================================ Item InputForm ============================== */}
        <div className="item-buttons">
          <Button color={"#007bff"} mr={"5px"} onClick={onOpen}>
            Add Article
          </Button>
          {/* <Button color={"#007bff"}>Edit Item</Button> */}
          <Modal isOpen={isOpen} onClose={onClose} style={{ width: "300px" }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Form Header</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit} id="new-form">
                  <FormControl id="item">
                    <FormLabel>Item Name</FormLabel>
                    <Input
                      type="text"
                      onChange={handleChange}
                      name="itemName"
                      value={formInput.itemName}
                    />
                  </FormControl>
                  <FormControl id="category">
                    <FormLabel>Category ID</FormLabel>
                    <Select
                      onChange={handleChange}
                      name="categoryId"
                      value={formInput.categoryId}
                    >
                      <option value="">Select Category ID</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Select>
                  </FormControl>
                  <FormControl id="has_shelf_life">
                    <FormLabel>Has Shelf Life</FormLabel>
                    <Checkbox
                      onChange={handleChange}
                      name="hasShelfLife"
                      checked={formInput.hasShelfLife}
                    >
                      Has Shelf Life
                    </Checkbox>
                  </FormControl>
                </form>
                {error && <p>{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" type="submit" form="new-form">
                  Add
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        {/*====================================================================================*/}

        {/*=============================== Item Table ===========================*/}
        <TableContainer className="table">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Item ID</Th>
                <Th>Item Name</Th>
                <Th>Category ID</Th>

                <Th>has_shelf_live</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {tableData.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.itemName}</Td>
                  <Td>{item.categoryId}</Td>
                  <Td>{item.hasShelfLife ? "Yes" : "No"}</Td>

                  <Td>
                    {item.expDate
                      ? item.expDate.toISOString().split("T")[0]
                      : ""}
                  </Td>
                </Tr>
              ))} */}

              {Items.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.itemName}</Td>
                  <Td>{item.categoryId}</Td>
                  <Td>{item.hasShelfLife ? "Yes" : "No"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {/*=============================================================================*/}
      </div>
    </div>
  );
};

export default Articles;

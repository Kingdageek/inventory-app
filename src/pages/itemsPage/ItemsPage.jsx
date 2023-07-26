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
} from "@chakra-ui/react";

import {
  fetchItems,
  storeItem,
  editItem,
  deleteItem,
} from "../../services/dashboard/itemService";
import Sidebar from "../../components/sidebar/Sidebar";
import "../itemsPage/ItemsPage.css";
import { useState } from "react";
import { Items } from "../../../utils/items";

const ItemsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [counter, setCounter] = useState(1);
  const [formInput, setFormInput] = useState(initialFormInput);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchItems((response) => {
      console.log("fetching item data", response);
      setTableData(response);
    });
  }, []);

  const initialFormInput = {
    itemName: "",
    expDate: null,
  };

  const validateForm = () => {
    if (!formInput.itemName.trim()) {
      return "Please enter Item Name";
    }
    return "";
  };

  const resetForm = () => {
    setFormInput(initialFormInput);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // // create new id
    // const newId = counter;
    // setCounter((prevCounter) => prevCounter + 1);

    // //Store the form input data in a new item object
    // const newItem = {
    //   id: newId,
    //   articleName: formInput.itemName,
    //   expDate: formInput.expDate,
    // };

    // // Store the form input data in tableData state
    // setTableData((prevTableData) => [...prevTableData, newItem]);

    // // Process the form submission
    // setFormInput(initialFormInput);
    // console.log(formInput);
    // setError("");
    // onClose();

    if (!formInput.id) {
      // Add new item
      storeItem(formInput, (response) => {
        setTableData((prevTableData) => [...prevTableData, response]);
        onClose();
      });
    } else {
      // Edit existing item
      editItem(formInput.id, formInput, (response) => {
        setTableData((prevTableData) =>
          prevTableData.map((item) => {
            if (item.id === formInput.id) {
              return { ...item, ...response };
            }
            return item;
          })
        );
        onClose();
      });
    }

    resetForm();
    setError("");
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId, (response) => {
      if (response === true) {
        setTableData((prevTableData) =>
          prevTableData.filter((item) => item.id !== itemId)
        );
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "expDate" ? new Date(value) : value;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: newValue,
    }));
  };

  return (
    <div className="items__page">
      <Sidebar />

      <div className="table-container">
        <h1>ITEMS</h1>
        {/* ================================ Item InputForm ============================== */}
        <div className="item-buttons">
          <Button color={"#007bff"} mr={"5px"} onClick={onOpen}>
            Add Item
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} style={{ width: "300px" }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Form Header</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit} id="new-form">
                  <FormControl id="item">
                    <FormLabel>Choose Article</FormLabel>
                    <Select
                      onChange={handleChange}
                      name="itemName"
                      value={formInput.itemName}
                    >
                      <option value="">Select Article</option>
                      {Items.map((item) => (
                        <option key={item.categoryId}>{item.itemName}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="exp_date">
                    <FormLabel>Article Shelf Life</FormLabel>
                    <Input
                      type="date"
                      onChange={handleChange}
                      name="expDate"
                      value={
                        formInput.expDate
                          ? formInput.expDate.toISOString().slice(0, 10)
                          : ""
                      }
                    />
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
                <Th>ITEM ID</Th>
                <Th>Article Name</Th>
                <Th>Shelf Life</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.id}</Td>
                  <Td>{item.articleName}</Td>
                  <Td>
                    {item.expDate
                      ? item.expDate.toISOString().split("T")[0]
                      : ""}
                  </Td>
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

export default ItemsPage;

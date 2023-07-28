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
  fetchCategories,
  storeCategory,
  deleteCategory,
  editCategory,
} from "../../services/dashboard";

import "../categoriesPage/Categories.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
// import { response } from "express";

const Categories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formInput, setFormInput] = useState({ name: "" });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editCategoryData, setEditCategoryData] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    // fetch all categories from API
    try {
      await fetchCategories((response) => {
        if (response.status === true) {
          setCategories(response);
        } else {
          setShowError(true);
        }
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      setShowError(true);
    }
  };

  const validateForm = () => {
    if (!formInput.name.trim()) {
      return "Please enter a category name";
    }
    return "";
  };

  const resetForm = () => {
    setFormInput({ name: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!editCategoryData) {
      //Store the form input data in a new item object
      storeCategory({ name: formInput.name }, (response) => {
        if (response && response.status === true) {
          alert("New Category Added");
          resetForm();
          onClose();
          getCategories();
        } else {
          console.log("Error adding category", response);
        }
      });
    } else {
      editCategory(editCategory.id, { name: formInput.name }, (response) => {
        if (response && response.status === true) {
          alert("Category Updated!");
          resetForm();
          onClose();
          setEditCategoryData(null);
          getCategories();
        }
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: value,
    }));
  };

  const handleReload = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  const handleEdit = (category) => {
    setEditCategoryData(category);
    setFormInput({ name: category.name }); // pre-fill from with current name
    onOpen();
  };

  const handleDelete = async (category) => {
    shouldDelete = confirm(
      "Deleting a category will delete all the articles and items attached to it. Proceed? "
    );
    if (!shouldDelete) return;
    await deleteCategory(category.id, (response) => {
      if (response) {
        // remove category with id category ID
        setCategories((prevCategories) => {
          const newCategories = prevCategories.filter(
            (prevCategory) => prevCategory.id !== category.id
          );
          return newCategories;
        });
      }
    });
  };

  return (
    <div className="categories">
      <Sidebar />

      <div className="table-container">
        <h1>CATEGORIES</h1>

        {/* ================= Item InputForm ===================== */}
        <div className="item-buttons">
          <Button color={"#007bff"} mr={"5px"} onClick={onOpen}>
            Add Category
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} style={{ width: "300px" }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit} id="new-form">
                  <FormControl id="name">
                    <FormLabel>Category name</FormLabel>
                    <Input
                      type="text"
                      onChange={handleChange}
                      name="name"
                      value={formInput.name}
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
        {/*========================================================*/}

        {/*=============================== Item Table ===========================*/}
        <TableContainer className="table">
          {showError ? (
            <div className="text-center">
              <h6>
                Unable to retrieve categories at this time.{" "}
                <a onClick={handleReload} href="#!">
                  Refresh page
                </a>
                .
              </h6>
              <p>Please, try again later if refreshing doesn't work</p>
            </div>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>DATE CREATED</Th>
                  <Th>ACTIONS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories}
                {categories.map((category, index) => {
                  const { id, name, created_at, updated_at } = category;
                  return (
                    <Tr key={id}>
                      <Td>{id}</Td>
                      <Td>{name}</Td>
                      <Td>{created_at}</Td>
                      <Td>
                        <button onClick={() => handleEdit(category)}>
                          edit
                        </button>
                        <button onClick={() => handleDelete(category)}>
                          delete
                        </button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )}
        </TableContainer>
        {/*=============================================================================*/}
      </div>
    </div>
  );
};

export default Categories;

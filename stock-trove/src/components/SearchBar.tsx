import { Input, InputGroup, InputLeftElement, Flex } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useDiscoverCompanyQueryStore from "../stores/useDiscoverCompanyQueryStore";

const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useDiscoverCompanyQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();

  return (
    <Flex direction="column" align="center" width={"1400px"}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchText(ref.current?.value || "");
          ref.current ? (ref.current.value = "") : "";
          navigate("/discover");
        }}
        style={{ width: "100%" }}
      >
        <InputGroup>
          <InputLeftElement>
            <BsSearch color="black" />
          </InputLeftElement>
          <Input
            ref={ref}
            borderRadius={10}
            color="black"
            placeholder={"Search Companies..."}
            variant="filled"
            bg="#D4DCFF"
            sx={{
              "::placeholder": {
                color: "black", // Set the placeholder text color to black
                opacity: 1, // Make sure it's fully opaque
              },
            }}
          />
        </InputGroup>
      </form>
    </Flex>
  );
};

export default SearchBar;

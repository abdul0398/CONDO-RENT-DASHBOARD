import { StylesConfig } from "react-windowed-select";

export const customStyles :StylesConfig= {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      shadow: "md",
      borderColor: state.isFocused ? "#0e4884" : "#0e4884",
      borderRadius: "10px",
      fontSize: "0.4rem",
      border: "2px solid #e5e7eb",
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
      minHeight: "3rem",
      maxHeight: "3rem",
      "&:hover": {
        borderColor: state.isFocused ? "#0e4884" : "#0e4884", // Adjust based on hover
        borderRadius: "0.375rem",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "black", // Adjust text color
      outline: "none",
      fontSize: "0.77rem",
      
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#4A5568", // Adjust text color
      fontSize: "0.77rem",

      

    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black", // Adjust placeholder color
      fontSize: "0.77rem",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "0.77rem",
      zIndex: 9999,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      pointerEvents: 'none'
    }),
    container: (provided) => ({
      ...provided,
      width: "100%",
      fontSize: "0.77rem",
    })
  };
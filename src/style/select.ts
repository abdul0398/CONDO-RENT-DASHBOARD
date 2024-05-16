
export const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "white",
      shadow: "md",
      borderColor: state.isFocused ? "#0e4884" : "#0e4884",
      borderRadius: "10px",
      border: "2px solid #e5e7eb",
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
      minHeight: "3rem",
      maxHeight: "3rem",
      "&:hover": {
        borderColor: state.isFocused ? "#0e4884" : "#0e4884", // Adjust based on hover
        borderRadius: "0.375rem",
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: "black", // Adjust text color
      outline: "none",
      fontSize: "0.875rem",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#4A5568", // Adjust text color
      fontSize: "0.875rem",

    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "black", // Adjust placeholder color
      fontSize: "0.875rem",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: "0.875rem",
      zIndex: 9999,
    }),
    indicatorsContainer: (provided:any) => ({
      ...provided,
      pointerEvents: 'none'
    }),
  };
import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ITextInputProps extends ChakraProps {
  type: React.HTMLInputTypeAttribute;
  id: string;
  name: string;
  label: string;
}

const TextInput: React.FunctionComponent<ITextInputProps> = ({
  type,
  id,
  name,
  label,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input {...field} id={id} name={name} type={type} />
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextInput;

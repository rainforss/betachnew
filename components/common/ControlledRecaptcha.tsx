import { ChakraProps, FormControl } from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface IControlledRecaptchaProps extends ChakraProps {
  name: string;
}

const ControlledRecaptcha: React.FunctionComponent<
  IControlledRecaptchaProps
> = ({ name, ...chakraProps }) => {
  const [_field, meta, helpers] = useField(name);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      <ReCAPTCHA
        sitekey="6LcFlvUeAAAAAIrm55AMOiDzS_EBkkH7wO05VH4O"
        onChange={(res) => {
          helpers.setValue(res);
        }}
      />
    </FormControl>
  );
};

export default ControlledRecaptcha;

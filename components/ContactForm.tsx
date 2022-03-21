import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as React from "react";
import { contactFormSubmissionSchema } from "../utils/validation";
import ControlledRecaptcha from "./ControlledRecaptcha";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

interface IContactFormProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  sentTo: { name: string; id: string };
}

const ContactForm: React.FunctionComponent<IContactFormProps> = (props) => {
  const toast = useToast();
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {!!props.sentTo.name
            ? `Message to ${props.sentTo.name}`
            : "Message Submission"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              bsi_firstname: "",
              bsi_lastname: "",
              bsi_email: "",
              bsi_message: "",
              bsi_contactid: props.sentTo.id,
              recaptcha: "",
            }}
            validationSchema={contactFormSubmissionSchema}
            onSubmit={async (values, action) => {
              try {
                const result = await fetch("/api/contactformsubmission", {
                  method: "POST",
                  body: JSON.stringify(values),
                });
                if (result.status >= 400) {
                  const resJson = await result.json();
                  throw new Error(resJson.error.message);
                }
                action.setSubmitting(false);
                action.resetForm();
                props.onClose();
                return toast({
                  title: "Message Submission Succeeded.",
                  description:
                    "You message has been submitted successfully, we will be in touch as soon as we can.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                });
              } catch (error: any) {
                return toast({
                  title: "Message Submission Failed.",
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                });
              }
            }}
          >
            {(props) => (
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <TextInput
                  name="bsi_firstname"
                  id="bsi_firstname"
                  type="text"
                  label="First Name"
                  w={{ base: "100%", md: "50%" }}
                  p="1rem"
                />
                <TextInput
                  name="bsi_lastname"
                  id="bsi_lastname"
                  type="text"
                  label="Last Name"
                  w={{ base: "100%", md: "50%" }}
                  p="1rem"
                />
                <TextInput
                  name="bsi_email"
                  id="bsi_email"
                  type="email"
                  label="Your Email"
                  w={{ base: "100%", md: "50%" }}
                  p="1rem"
                />
                <TextAreaInput
                  name="bsi_message"
                  id="bsi_message"
                  label="Your Message"
                  w="100%"
                  p="1rem"
                />
                {/* <ReCAPTCHA
                    sitekey="6LcFlvUeAAAAAIrm55AMOiDzS_EBkkH7wO05VH4O"
                    onChange={(res) => {
                      props.setFieldValue("recaptcha", res);
                    }}
                  /> */}
                <ControlledRecaptcha name="recaptcha" p="1rem" />
                <Button
                  ml="1rem"
                  mt="2rem"
                  variant="solid"
                  colorScheme="teal"
                  type="submit"
                  isLoading={props.isSubmitting}
                >
                  Submit Form
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={props.onClose}
            variant="outline"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContactForm;

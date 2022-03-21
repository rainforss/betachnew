import * as Yup from "yup";

export const contactFormSubmissionSchema = Yup.object().shape({
  bsi_firstname: Yup.string()
    .trim()
    .min(1, "Please enter your first name")
    .required("First name is required."),
  bsi_lastname: Yup.string()
    .trim()
    .min(1, "Please enter your last name")
    .required("Last name is required."),
  bsi_email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  bsi_message: Yup.string()
    .trim()
    .min(10, "Message is too short.")
    .required("Please enter your message to us."),
  recaptcha: Yup.string().required(
    "Please complete reCAPTCHA before submitting."
  ),
});

import * as Yup from "yup";

const profileSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must contain at least 2 characters")
    .max(256, "First name is too long")
    .required("First name is required"),

  middleName: Yup.string()
    .max(256, "Middle name is too long"),

  lastName: Yup.string()
    .min(2, "Last name must contain at least 2 characters")
    .max(256, "Last name is too long")
    .required("Last name is required"),

  phone: Yup.string().matches(/^0\d{8,10}$/,"Phone must be an Israeli number containing 9-11 digits").required("Phone is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  street: Yup.string().required("Street is required"),
  houseNumber: Yup.number().typeError("House number must be a number").min(1, "House number must be at least 1").required("House number is required"),
  state: Yup.string(),
  zip: Yup.string().matches(/^\d*$/, "Zip code must contain numbers only"),
  imageUrl: Yup.string().url("Please enter a valid image URL"),
  imageAlt: Yup.string().when("imageUrl", {
    is: (value) => Boolean(value),
    then: (schema) =>
      schema.required("Image alt text is required when an image URL is provided"),otherwise: (schema) => schema,}),

  currentPassword: Yup.string().required("Current password is required"),
});

export default profileSchema;
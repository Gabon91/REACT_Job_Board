import * as Yup from "yup";

const registerSchema = Yup.object({
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

  phone: Yup.string()
    .matches(
      /^0\d{8,10}$/,
      "Phone must be an Israeli number containing 9-11 digits"
    )
    .required("Phone is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(
      /(?:.*\d){4,}/,
      "Password must contain at least 4 digits"
    )
    .matches(
      /[!@#$%^&*()\-]/,
      "Password must contain a special character"
    )
    .required("Password is required"),

  country: Yup.string()
    .required("Country is required"),

  city: Yup.string()
    .required("City is required"),

  street: Yup.string()
    .required("Street is required"),

  houseNumber: Yup.number()
    .typeError("House number must be a number")
    .min(1, "House number must be at least 1")
    .required("House number is required"),

  state: Yup.string(),

  zip: Yup.string()
    .matches(/^\d*$/, "Zip code must contain numbers only"),

  imageUrl: Yup.string()
    .url("Please enter a valid image URL"),

  imageAlt: Yup.string().when("imageUrl", {
    is: (value) => Boolean(value),
    then: (schema) =>
      schema.required(
        "Image alt text is required when an image URL is provided"
      ),
    otherwise: (schema) => schema,
  }),

  isRecruiter: Yup.boolean(),
});

const normalizeUser = (values) => {
  return {
    name: {
      first: values.firstName.trim(),
      middle: values.middleName.trim(),
      last: values.lastName.trim(),
    },

    phone: values.phone.replace(/[\s-]/g, ""),
    email: values.email.trim().toLowerCase(),
    password: values.password,

    image: {
      url: values.imageUrl.trim(),
      alt: values.imageAlt.trim(),
    },

    address: {
      state: values.state.trim(),
      country: values.country.trim(),
      city: values.city.trim(),
      street: values.street.trim(),
      houseNumber: Number(values.houseNumber),
      zip: values.zip ? Number(values.zip) : 0,
    },

    isRecruiter: values.isRecruiter,
  };
};

export default normalizeUser;


import * as Yup from "yup";

const jobSchema = Yup.object({
  title: Yup.string()
    .min(2, "Job title must contain at least 2 characters")
    .max(256, "Job title must contain at most 256 characters")
    .required("Job title is required"),

  company: Yup.string()
    .min(2, "Company name must contain at least 2 characters")
    .max(256, "Company name must contain at most 256 characters")
    .required("Company name is required"),

  description: Yup.string()
    .min(2, "Description must contain at least 2 characters")
    .max(1024, "Description must contain at most 1024 characters")
    .required("Description is required"),

  category: Yup.string()
    .min(2, "Category must contain at least 2 characters")
    .required("Category is required"),

  location: Yup.string()
    .min(2, "Location must contain at least 2 characters")
    .required("Location is required"),

  jobType: Yup.string()
    .oneOf([
      "full-time",
      "part-time",
      "freelance",
      "temporary",
      "internship",
    ])
    .required("Job type is required"),

  experienceLevel: Yup.string()
    .oneOf([
      "entry level",
      "junior",
      "mid-level",
      "senior",
      "team lead",
      "management",
    ])
    .required("Experience level is required"),

  minSalary: Yup.number()
    .typeError("Minimum salary must be a number")
    .min(0, "Salary cannot be negative")
    .required("Minimum salary is required"),

  maxSalary: Yup.number()
    .typeError("Maximum salary must be a number")
    .min(0, "Salary cannot be negative")
    .required("Maximum salary is required")
    .test(
      "max-greater-than-min",
      "Maximum salary must be greater than or equal to minimum salary",
      function (value) {
        const { minSalary } = this.parent;

        if (value === undefined || minSalary === undefined) {
          return true;
        }

        return value >= minSalary;
      }
    ),

  phone: Yup.string()
    .matches(/^0\d{8,10}$/, "Please enter a valid Israeli phone number")
    .required("Phone is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  applyLink: Yup.string()
    .url("Please enter a valid URL"),

  imageUrl: Yup.string()
    .url("Please enter a valid image URL"),

  imageAlt: Yup.string().when("imageUrl", {
    is: (value) => Boolean(value),
    then: (schema) =>
      schema.required("Image alt text is required when an image is provided"),
    otherwise: (schema) => schema,
  }),
});

export default jobSchema;
const normalizeJob = (values) => {
  return {
    title: values.title.trim(),
    company: values.company.trim(),
    description: values.description.trim(),
    category: values.category.trim(),
    jobType: values.jobType,
    experienceLevel: values.experienceLevel,
    location: values.location.trim(),
    salary: {min: Number(values.minSalary), max: Number(values.maxSalary)},
    phone: values.phone.replace(/[\s-]/g, ""),
    email: values.email.trim().toLowerCase(),
    applyLink: values.applyLink.trim(),
    image: {url: values.imageUrl.trim(), alt: values.imageAlt.trim()},
  };
};

export default normalizeJob;
const normalizeProfile = (values) => {
  return {
    name: {
      first: values.firstName.trim(),
      middle: values.middleName.trim(),
      last: values.lastName.trim(),
    },

    phone: values.phone.replace(/[\s-]/g, ""),

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
  };
};

export default normalizeProfile;
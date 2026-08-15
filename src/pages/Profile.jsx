import {useEffect,useState} from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import {Formik,Form} from "formik";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import { useAuth } from "../contexts/AuthContext";
import {getUserById,updateUser,toggleRecruiterStatus} from "../services/usersService";
import profileSchema from "../validation/profileSchema";
import normalizeProfile from "../utils/normalizeProfile";
import getErrorMessage from "../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { user,logout} = useAuth();
  const userId = user?.id || user?._id;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [changingRecruiterStatus, setChangingRecruiterStatus] =
  useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserById(userId);
        setProfile(data);
      } catch (error) {
        setError(getErrorMessage(error,"Failed to load your profile."));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <LoadingSpinner message="Loading profile..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger"> {error} </div>
      </main>
    );
  }

  if (!profile) {
    return null;
  }

  const initialValues = {
    firstName: profile.name?.first || "",
    middleName: profile.name?.middle || "",
    lastName: profile.name?.last || "",
    
    phone: profile.phone || "",
    
    country: profile.address?.country || "",
    city: profile.address?.city || "",
    street: profile.address?.street || "",
    houseNumber: profile.address?.houseNumber ?? "",
    state: profile.address?.state || "",
    zip: profile.address?.zip || "",

    imageUrl: profile.image?.url || "",
    imageAlt: profile.image?.alt || "",

    currentPassword: "",
  };

  const handleSubmit = async (values,{ setSubmitting, resetForm }) => {
    try {
      const updatedData = {...normalizeProfile(values),
        // Required by the API, but not editable
        email: profile.email,
        // Current password is used only for this request
        password: values.currentPassword,
        // Preserve current recruiter status
        isRecruiter: profile.isRecruiter};

      const updatedUser = await updateUser(userId,updatedData);

      setProfile(updatedUser);
      toast.success("Profile updated successfully!");

      resetForm({values: {...values,currentPassword: "",},});
    } catch (error) {
      toast.error(getErrorMessage(error,"Could not update your profile."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecruiterToggle = async () => {
  try {
    setChangingRecruiterStatus(true);
    await toggleRecruiterStatus(userId);
    toast.success(profile.isRecruiter? "Recruiter status removed. Please log in again.": "Recruiter status enabled. Please log in again.");
    logout();
    navigate("/login", {replace: true,});
  } catch (error) {
    toast.error(getErrorMessage(error,"Could not update recruiter status."));
  } finally {
    setChangingRecruiterStatus(false);
  }
};

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="mb-4"> My Profile </h1>
              <div className="alert alert-secondary">
                <strong>Email:</strong>{" "}
                {profile.email}
                <br /> Email and password cannot be changed from this page.
              </div>
              <Formik initialValues={initialValues} enableReinitialize validationSchema={profileSchema} onSubmit={handleSubmit}>
                {({isSubmitting, isValid, dirty}) => (
                  <Form>
                    <h4 className="mb-3"> Personal Details </h4>
                    <div className="row">
                      <div className="col-md-4">
                        <FormInput label="First Name" name="firstName"/>
                      </div>
                      <div className="col-md-4">
                        <FormInput label="Middle Name" name="middleName"/>
                      </div>
                      <div className="col-md-4">
                        <FormInput label="Last Name" name="lastName"/>
                      </div>
                    </div>
                    <FormInput label="Phone" name="phone" type="tel"/>
                    <hr className="my-4" />
                    <h4 className="mb-3"> Address </h4>
                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="Country" name="country"/>
                      </div>
                      <div className="col-md-6">
                        <FormInput label="City" name="city"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <FormInput label="Street" name="street"/>
                      </div>
                      <div className="col-md-4">
                        <FormInput label="House Number" name="houseNumber" type="number"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <FormInput label="State / District" name="state"/>
                      </div>
                      <div className="col-md-6">
                        <FormInput label="Zip Code" name="zip"/>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h4 className="mb-3"> Profile Image </h4>
                    <FormInput label="Image URL" name="imageUrl"/>
                    <FormInput label="Image Alt Text" name="imageAlt"/>
                    <hr className="my-4" />
                    <h4 className="mb-3"> Confirm Changes </h4>
                    <p className="text-muted"> Enter your current password to save your profile changes.</p>
                    <FormInput label="Current Password" name="currentPassword" type="password"/>
                    <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isSubmitting || !isValid || !dirty}>
                      {isSubmitting? "Saving..." : "Save Changes"}
                    </button>
                  </Form>
                )}
              </Formik>

              <hr className="my-5" />
              <div>
                <h3>Recruiter Status</h3>
                <p className="text-muted"> Current status:{" "} 
                  <strong> {profile.isRecruiter? "Recruiter" : "Regular User"} </strong>
                </p>

                <button type="button" className={profile.isRecruiter? "btn btn-outline-danger": "btn btn-outline-primary"} onClick={handleRecruiterToggle} disabled={changingRecruiterStatus}>
                  {changingRecruiterStatus? "Updating..." : profile.isRecruiter? "Disable Recruiter Account": "Become a Recruiter"}
                </button>
                <p className="small text-muted mt-2"> Changing recruiter status requires you to log in again. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Profile;
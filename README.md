# Job Board

A modern React-based job board application for job seekers, recruiters, and administrators.
The project provides a complete workflow for discovering job opportunities, saving jobs, publishing and managing job listings, editing user profiles, and administering registered users through role-based permissions.

## Project Goal
The goal of Job Board is to provide a responsive and user-friendly platform that connects job seekers with recruiters while demonstrating a complete React application architecture.

The application includes:
- Public job browsing and job details
- Real-time search and filtering
- User registration and login
- JWT-based authentication
- Saved jobs
- Recruiter job management
- User profile management
- Administrator user management
- Light and dark themes
- Responsive design for mobile, tablet, and desktop

---

## Technologies

The project was built with:

- **React**
- **JavaScript**
- **Vite**
- **React Router DOM**
- **Axios**
- **Formik**
- **Yup**
- **Bootstrap**
- **React Icons**
- **React Toastify**
- **React Context API**
- **JWT Authentication**
- **Local Storage**
- **REST API**

---

## Installation and Setup
### Prerequisites
Make sure the following are installed:
- Node.js
- npm

### Clone the repository
git clone <YOUR_REPOSITORY_URL>
cd job-board

### Install dependencies
npm install

### Create the environment file
Create a `.env` file in the root directory:
env
VITE_API_URL=https://api.webify.host

An `.env.example` file should also be included in the repository:
env
VITE_API_URL=

### Start the development server
npm run dev
Vite will display the local development URL in the terminal.

### Production build
npm run build

---

## Environment Variables
The application uses the following environment variable:
| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL used for communication with the Job Board REST API |

Current API address: https://api.webify.host

The API URL is read through:
javascript
import.meta.env.VITE_API_URL
Sensitive information should not be committed to the repository.

---

## User Types and Permissions
The application supports several user roles.

### Guest
A guest can:
- Browse available jobs
- Search and filter jobs
- View full job details
- View the About page
- Register a new account
- Log in
A guest cannot save jobs or access authenticated pages.

### Registered User
A logged-in user can:
- Access all public features
- Save and remove jobs from Saved Jobs
- View the Saved Jobs page
- Edit personal profile information
- Change recruiter status
- Log out securely

### Recruiter
A recruiter has all regular user permissions and can also:
- Publish new jobs
- View the **My Jobs** page
- Edit jobs they created
- Delete jobs they created
- Manage their own job listings

### Administrator
An administrator has elevated permissions and can:
- Access the Admin Dashboard
- View all registered users
- Search users
- Use pagination in the users table
- Delete non-administrator users
- Edit and delete job listings according to administrator permissions

Administrator users cannot be deleted from the Admin Dashboard.
---

## Authentication and Authorization
Authentication is based on JWT.
After a successful login:
1. The server returns a JWT.
2. The token is stored in `localStorage`.
3. The token is decoded and authentication information is managed through `AuthContext`.
4. Protected routes check authentication and role permissions.
5. Authenticated API requests send the token through the `x-auth-token` header.

Logging out:
- Removes the JWT from `localStorage`
- Clears the authentication context
- Updates the navigation immediately

When recruiter status changes, the user is logged out and must log in again so that a new JWT is issued with the updated permissions.
---

## Main Features
### Job Browsing
The Home page retrieves available jobs from the REST API and displays them using reusable `JobCard` components.

Each job card includes:
- Company image/logo with fallback image handling
- Job title
- Company
- Location
- Category
- Job type
- Experience level
- Salary range
- Publication date
- Save/unsave action for authenticated users
- Edit/delete actions for authorized users
The full card can be used to navigate to the job details page.

### Search and Filtering
Jobs can be filtered in real time by:
- Job title
- Company
- Category
- Location
- Job type
- Experience level
- Salary range
Search input uses debounce behavior.

Filtering is performed before pagination, and changing a filter returns the user to the first page.

### Pagination
Reusable pagination is used across the application.
It supports:
- Previous and next navigation
- Current page indication
- Disabled navigation when no additional page exists
- Responsive mobile presentation
- Page correction after filtering or deletion

### Job Details
Each job has a public details page that displays its full information and application details.
Invalid or missing jobs display a clear error state instead of a blank page.

### Saved Jobs
Authenticated users can save or remove jobs.
Saved jobs are calculated on the client from the jobs returned by the API.
When a saved job is removed, it disappears from the Saved Jobs page immediately without requiring a browser refresh.

### Recruiter Job Management
Recruiters have access to a dedicated **My Jobs** page.
They can:
- View jobs they published
- Publish a new job
- Edit existing jobs
- Delete jobs after confirmation
- Use pagination
- See an empty-state call to action when no jobs have been published

### Create and Edit Job
Job forms use:
- Formik
- Yup validation
- Reusable form fields
- Loading/submission states
- Error handling
- Toast notifications
Job information is normalized before being sent to the API.
Server-generated fields are not exposed as editable form fields.

### Delete Confirmation
Destructive actions use a reusable `ConfirmationModal`.
Job deletion requires confirmation before the DELETE request is performed.
User deletion in the Admin Dashboard also requires confirmation.

### Profile Management
Authenticated users can load and update their profile information.
Editable profile information includes:
- First name
- Middle name
- Last name
- Phone
- Address
- Profile image
Email, administrator status, and other restricted account fields are not editable through the profile form.
The API requires the current password when saving profile changes. The password is used only for the update request and is not stored in `localStorage`.

### Recruiter Status
Users can enable or disable recruiter status from their profile.
After the recruiter status is changed:
- The existing JWT is considered outdated
- The user is logged out
- The user is redirected to log in again
This ensures that permissions always reflect the JWT issued by the server.

### Admin Dashboard
Administrator users have access to an admin-only dashboard.
It includes:
- User table
- Full name
- Email
- Phone
- Registration date
- Recruiter status
- Administrator status
- Search
- Pagination
- User deletion confirmation
Delete controls are not shown for administrator accounts.

### Loading States
The application uses loading indicators appropriate to each context:
- Job card skeletons for job lists
- Loading spinners for individual resources and pages
- Disabled buttons during asynchronous actions
- Saving/deleting states during form submissions and destructive actions

### Error Handling
API errors are normalized through a reusable error utility.
The interface handles scenarios such as:
- Server connection failures
- Invalid or missing authentication
- Permission errors
- Missing resources
- Validation errors
- Duplicate information
- Incorrect login information
- Locked accounts
- Server errors
Raw server error objects and stack traces are not shown to users.

### Toast Notifications
Toast notifications provide feedback after important actions, including:
- Registration
- Login
- Job creation
- Job update
- Job deletion
- Save/unsave
- Permission errors
- Server connection problems
- Profile updates
- Recruiter status changes
- Administrator actions
Toast notifications automatically follow the active light/dark theme.

### Light and Dark Mode
The application supports global light and dark themes.
Theme state is managed with `ThemeContext` and stored in `localStorage`.
The selected theme applies throughout the application, including navigation, cards, forms, modals, pagination, Toast notifications, and page backgrounds.

### Responsive Design
The application is designed for:
- Mobile
- Tablet
- Desktop

Responsive behavior includes:
- Hamburger navigation on mobile
- One-column job cards on mobile
- Two-column layouts on tablets
- Three-column layouts on desktop
- Responsive forms
- Responsive admin table
- Compact mobile pagination
- Responsive confirmation modals
---

## Main Routes
| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page and job listings |
| `/jobs/:id` | Public | Job details |
| `/about` | Public | About the project |
| `/login` | Guests | Login |
| `/register` | Guests | Registration |
| `/saved-jobs` | Authenticated | Saved jobs |
| `/my-jobs` | Recruiter | Recruiter's job listings |
| `/jobs/create` | Recruiter | Create a new job |
| `/jobs/edit/:id` | Job owner / Admin | Edit a job |
| `/profile` | Authenticated | User profile management |
| `/admin` | Admin | Administrator dashboard |
| `*` | Public | Custom 404 page |

---

## Project Structure
The main application structure is approximately:
src/
├── assets/
│   └── images and fallback assets
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── JobCard.jsx
│   ├── JobCardSkeleton.jsx
│   ├── SearchFilters.jsx
│   ├── Pagination.jsx
│   ├── LoadingSpinner.jsx
│   ├── EmptyState.jsx
│   ├── ConfirmationModal.jsx
│   ├── FormInput.jsx
│   └── ProtectedRoute.jsx
├── contexts/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   └── useDebounce.js
├── layouts/
├── pages/
│   ├── Home.jsx
│   ├── JobDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── SavedJobs.jsx
│   ├── MyJobs.jsx
│   ├── CreateJob.jsx
│   ├── EditJob.jsx
│   ├── Profile.jsx
│   ├── AdminDashboard.jsx
│   ├── About.jsx
│   └── NotFound.jsx
├── routes/
│   └── AppRoutes.jsx
├── services/
│   ├── apiClient.js
│   ├── jobsService.js
│   └── usersService.js
├── styles/
├── utils/
│   ├── jwtUtils.js
│   ├── getErrorMessage.js
│   ├── normalizeJob.js
│   ├── normalizeUser.js
│   └── normalizeProfile.js
├── validation/
│   ├── jobSchema.js
│   ├── registerSchema.js
│   └── profileSchema.js
├── App.jsx
├── main.jsx
└── index.css
index.html
package-lock.json
package.json
README.MD
viteconfig.js
---


## Screenshots

Under folder as:
screenshots/


Recommended screenshots:

### 1. Home Page

Screenshot showing the Home page, job cards, search/filter controls, and pagination.
file: screenshots/Home_Guest.png
file: screenshots/Home_Guest_Pagination.png

### 2. Dark Mode
Screenshot showing the application in Dark Mode, preferably the Home page or job details page.
file: screenshots/Home_Dark_Mode.png

### 3. Job Details
Screenshot of a complete job details page.
file: screenshots/Job_Details.png

### 4. Saved Jobs
Screenshot showing jobs saved by an authenticated user.
file: creenshots/Saved_Jobs.png

### 5. Recruiter - My Jobs
Screenshot showing the recruiter My Jobs page with edit/delete controls.
file: screenshots/My_Jobs.png

### 6. Create or Edit Job
screenshot of the Create Job or Edit Job form.
file: screenshots/Create_Job.png
file: screenshots/Edit_job.png

### 7. User Profile
screenshot of the Profile page, including profile editing and recruiter status.
file: screenshots/Profile.png

### 8. Admin Dashboard
screenshot of the administrator users table, search, pagination, and permission badges.
file: screenshots/Admin_Dashboard.png

### Optional: Responsive Mobile View
screenshot of mobile responsive showing the hamburger navigation and single-column job layout.
file: screenshots/Mobile_View_1.png
file: screenshots/Mobile_View_2.png
file: screenshots/Mobile_View_3.png
file: screenshots/Mobile_View_4.png
---

## Developer
**Gabi Levi**
---

## Notes
- The project uses a REST API for jobs and users.
- The API base URL is configured through `.env`.
- JWT is stored only in `localStorage`.
- User permissions are enforced both in the UI and through protected routes/actions.
- Missing or broken company images use a local fallback image.
- Important actions provide immediate UI feedback without requiring a manual browser refresh.
- The application includes a custom 404 page.
- Before submission, run a clean installation and production build to verify that the project contains no build or console errors.

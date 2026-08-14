import {FaSearch, FaBookmark, FaBriefcase, FaUser, FaUserTie, FaUserShield, FaReact} from "react-icons/fa";

function About() {
  return (
    <main className="container py-5">
      <section className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3"> About Job Board </h1>

        <p className="lead text-muted mx-auto">
          Job Board is a modern platform designed to connect
          job seekers with recruiters and help users discover,
          save and manage job opportunities in one place.
        </p>
      </section>

      <section className="row g-4 mb-5">
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center p-4">
              <FaSearch size={35} className="mb-3" />
              <h3 className="h5"> Search Jobs </h3>

              <p className="text-muted mb-0">
                Browse available job opportunities and filter
                them by title, company, category, location,
                job type, experience level and salary.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center p-4">
              <FaBookmark size={35} className="mb-3" />
              <h3 className="h5"> Save Opportunities </h3>

              <p className="text-muted mb-0">
                Logged-in users can save interesting jobs and
                access them later from their Saved Jobs page.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center p-4">
              <FaBriefcase size={35} className="mb-3" />
              <h3 className="h5"> Recruit Talent </h3>

              <p className="text-muted mb-0">
                Recruiters can publish new jobs, manage their
                existing listings, update job information and
                remove positions that are no longer available.
              </p>
            </div>
          </div>
        </div>

      </section>

      <section className="mb-5">
        <h2 className="text-center mb-4"> User Types </h2>
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="card h-100">
              <div className="card-body p-4">
                <FaUser size={30} className="mb-3" />

                <h3 className="h5"> Job Seeker </h3>
                <p className="text-muted mb-0">
                  Can browse jobs, view job details and save
                  opportunities for later.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100">
              <div className="card-body p-4">
                <FaUserTie size={30} className="mb-3" />
                <h3 className="h5"> Recruiter </h3>

                <p className="text-muted mb-0">
                  Has all regular user features and can also
                  create, edit and delete their own job listings.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100">
              <div className="card-body p-4">
                <FaUserShield size={30} className="mb-3" />
                <h3 className="h5"> Administrator </h3>

                <p className="text-muted mb-0">
                  Has elevated permissions for managing users
                  and performing administrative actions across
                  the platform.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center gap-3 mb-3">
            <FaReact size={35} />
            <h2 className="mb-0"> Project Technologies </h2>
          </div>

          <p className="text-muted">
            The application was developed as a React project
            using a component-based architecture and REST API
            communication.
          </p>

          <div className="row">
            <div className="col-12 col-md-6">
              <ul className="mb-md-0">
                <li>React + JavaScript</li>
                <li>React Router</li>
                <li>Axios</li>
                <li>Context API</li>
              </ul>
            </div>

            <div className="col-12 col-md-6">
              <ul className="mb-0">
                <li>Formik + Yup</li>
                <li>React Toastify</li>
                <li>Bootstrap</li>
                <li>React Icons</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
function Footer() {
  return (
    <footer className="bg-body-tertiary border-top py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1 fw-semibold"> Job Board </p>

        <p className="text-muted small mb-0"> © {new Date().getFullYear()} Gabi's Job Board Built with React. </p>
      </div>
    </footer>
  );
}

export default Footer;
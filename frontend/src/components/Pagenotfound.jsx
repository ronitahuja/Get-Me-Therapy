import './styles.css';
const Pagenotfound=()=>{
    return (
        <div className="page-not-found">
          <div className="not-found-content">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <p>Please check the URL or return to the homepage.</p>
            <a href="/" className="home-link">
              Go to Homepage
            </a>
          </div>
        </div>
      );
}
export default Pagenotfound;
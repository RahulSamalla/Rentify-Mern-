// import React from 'react';
// import Login from './Login';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="home-container">
//       <div className="left-section">
//         <img src="https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg" alt="Your Image" />
//       </div>
//       <div className="right-section">
//         <div className="login-box">
//           <Login />
//           <p>If you are not registered, <Link to="/register">sign up now</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login'; // Import the Login component

const Home = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        {/* Add your image here */}
        <img src="https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg" alt="Your Image" />
      </div>
      <div className="right-section" style={{ textAlign: 'center', padding: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Welcome to Rentify</h2>
        {/* Render the Login component */}
        <Login />
        <div>
          <p style={{ marginBottom: '10px' }}>If not a member, please register:</p>
          <Link to="/register" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;


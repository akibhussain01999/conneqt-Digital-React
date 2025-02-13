import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { LightHouseEndpoints } from "../../api/endpoints";
import { auth, provider, signInWithPopup } from '../../Auth/Firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/slice/authSlice";
const API_URL = LightHouseEndpoints.SIGNUP_LOGIN;

function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
   

    useEffect(() => {
        // Check if the user is already logged in (e.g., via token in localStorage)
        const token = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");
        if (token) {
            setIsLoggedIn(true);
            setUsername(storedUsername || '');
        }
    }, []);

    const [showOffcanvas, setShowOffcanvas] = React.useState(false);

    const handleShowOffcanvas = () => setShowOffcanvas(true);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => setShowLoginModal(false);

    const handleShowSignupModal = () => setShowSignupModal(true);
    const handleCloseSignupModal = () => setShowSignupModal(false);

    // const handleLogin = async (e) => {
    //     e.preventDefault(); // Prevent form submission
    //     const email = document.getElementById('loginEmail').value;
    //     const password = document.getElementById('loginPassword').value;
    //     const { success, data, error } = await login(email, password);
    //     if (success) {
    //         Swal.fire('Success', 'Login successful!', 'success');
    //         setIsLoggedIn(true);
    //         setUsername(data.username || 'User'); // Assuming API returns username
    //         handleCloseLoginModal();
    //     } else {
    //         Swal.fire('Error', error || 'Login failed!', 'error');
    //     }
    // };

    // const handleSignup = async (e) => {
    //     e.preventDefault(); // Prevent form submission
    //     const email = document.getElementById('signupEmail').value;
    //     const password = document.getElementById('signupPassword').value;
    //     const { success, data, error } = await signup(email, password);
    //     if (success) {
    //         Swal.fire('Success', 'Signup successful!', 'success');
    //         handleCloseSignupModal();
    //     } else {
    //         Swal.fire('Error', error || 'Signup failed!', 'error');
    //     }
    // };

  

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                user.getIdToken()
                    .then((idToken) => {
                        fetch(API_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ token: idToken, loginType: "socialMedia" })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                Swal.fire('Success', 'Google login successful!', 'success');
                                localStorage.setItem("token", idToken);
                                localStorage.setItem("userId", data.user._id);
                                localStorage.setItem("username", data.user.username);
                                
                                setIsLoggedIn(true);
                                setUsername(data.user.username || 'User');
                                handleCloseLoginModal(); 
                                dispatch(login());
                                navigate("/notes"); // Redirect to Notes page after login
                            } else {
                                Swal.fire('Error', 'Login failed!', 'error');
                            }
                        })
                        .catch((error) => {
                            console.error("Error logging in:", error);
                            Swal.fire('Error', 'Google login failed!', 'error');
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting ID token:", error.message);
                        Swal.fire('Error', 'Failed to retrieve ID token!', 'error');
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                Swal.fire('Error', errorMessage || 'Google login failed!', 'error');
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername('');
        dispatch(logout());
        Swal.fire('Logged out', 'You have been logged out successfully.', 'success');
    };

return (
    <>
       <Navbar variant="dark" expand="lg" fixed="top" style={{ zIndex: 9999, backgroundColor: '#065f93' }}>
            <Container fluid>
                <Navbar.Brand href="#home">Notes App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav" >
                    <Nav className="ms-auto">
                      {/* Routed Nav Links */}
                {/* <Nav.Link as={Link} to="/companies" style={{ marginRight: '15px' }}>
                    <i className="bi bi-heart-pulse-fill me-2"></i> Companies
                </Nav.Link>
              
                <Nav.Link as={Link} to="/policy-finder" style={{ marginRight: '15px' }}>
                    <i className="bi bi-file-earmark-medical me-2"></i> Policy Finder
                </Nav.Link>
                <Nav.Link as={Link} to="/compare" style={{ marginRight: '15px' }}>
                    <i className="bi bi-arrow-left-right me-2"></i> Compare
                </Nav.Link>
                <Nav.Link as={Link} to="/blog" style={{ marginRight: '15px' }}>
                    <i className="bi bi-pencil-square me-2"></i> Blog
                </Nav.Link>
                <Nav.Link as={Link} to="/companies" style={{ marginRight: '15px' }}>
                    <i className="bi bi-search me-2"></i> Search
                </Nav.Link> */}

                        {isLoggedIn ? (
                            <>
                                {/* Show in Desktop View */}
                                <div className="d-none d-lg-block d-flex justify-content-center">
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="outline-light" id="dropdown-user" style={{ borderRadius: '15px' }}>
                                            <i className="bi bi-person-circle"></i> {username}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            style={{
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                right: 'auto',
                                                position: 'absolute',
                                            }}
                                        >
                                            <Dropdown.Item href="#profile">
                                                <i className="bi bi-person me-2"></i> Profile
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#contribution">
                                                <i className="bi bi-graph-up me-2"></i> Contribution
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#settings">
                                                <i className="bi bi-gear me-2"></i> Settings
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#help-center">
                                                <i className="bi bi-question-circle me-2"></i> Help Center
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={handleLogout} className="text-danger">
                                                <i className="bi bi-box-arrow-right me-2"></i> Signout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                                {/* Show in Mobile View */}
                                <div className="d-lg-none">
                                    <Nav.Link href="#profile" style={{ marginBottom: '10px' }}>
                                        <i className="bi bi-person me-2"></i> Profile
                                    </Nav.Link>
                                    <Nav.Link href="#contribution" style={{ marginBottom: '10px' }}>
                                        <i className="bi bi-graph-up me-2"></i> Contribution
                                    </Nav.Link>
                                    <Nav.Link href="#settings" style={{ marginBottom: '10px' }}>
                                        <i className="bi bi-gear me-2"></i> Settings
                                    </Nav.Link>
                                    <Nav.Link href="#help-center" style={{ marginBottom: '10px' }}>
                                        <i className="bi bi-question-circle me-2"></i> Help Center
                                    </Nav.Link>
                                    <Nav.Link onClick={handleLogout} className="text-danger" style={{ marginBottom: '10px' }}>
                                        <i className="bi bi-box-arrow-right me-2"></i> Signout
                                    </Nav.Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-light" onClick={handleShowLoginModal} style={{ borderRadius: '15px', margin: '5px' }}>
                                    <i className="bi bi-box-arrow-right me-1"></i> Login
                                </Button>
                                <Button variant="outline-light" onClick={handleShowSignupModal} style={{ borderRadius: '15px', margin: '5px' }}>
                                    <i className="bi bi-person-plus me-1"></i> Sign up
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        {/* Login Modal */}
        <Modal show={showLoginModal} onHide={handleCloseLoginModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Social Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mt-3">
                    <Button variant="light" className="w-100 d-flex align-items-center justify-content-center" onClick={handleGoogleLogin}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Login with Google
                    </Button>
                </div>
            </Modal.Body>
        </Modal>

        {/* Signup Modal */}
        <Modal show={showSignupModal} onHide={handleCloseSignupModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mt-3">
                    <Button variant="light" className="w-100 d-flex align-items-center justify-content-center" onClick={handleGoogleLogin}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Login with Google
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    </>
)};



export default Header;

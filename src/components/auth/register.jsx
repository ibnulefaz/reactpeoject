import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Register = () => {
    const navigate = useNavigate();
    const { createUserwithPass, signInWithGoogle } = useContext(AuthContext);

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [operationLoading, setOperationLoading] = useState(false);
    const [emailInput, setEmailInput] = useState('');

    const provider = new GoogleAuthProvider();

    // Password Regex: Min 8 chars, 1 Upper, 1 Lower, 1 Number, 1 Special
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleRegisterForm = async (e) => {
        e.preventDefault();

        // Reset messages
        setSuccessMsg('');
        setErrorMsg('');
        setOperationLoading(true);

        // Capture values from the form inputs
        // Ensure these "name" values match your <input name="..." /> exactly
        const fullname = e.target.fullname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const photoUrl = e.target.photoUrl.value;

        // 1. Validation: Password Match
        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            setOperationLoading(false);
            return;
        }

        // 2. Validation: Password Strength
        if (!passwordRegex.test(password)) {
            setErrorMsg("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            setOperationLoading(false);
            return;
        }

        // 3. Firebase Registration
        try {
            const result = await createUserwithPass(email, password);
            console.log("Registration Success:", result.user);
            setSuccessMsg("Registration Successful!");

            // Optional: Update profile with name and photo here if needed

            navigate('/');
        } catch (error) {
            console.error("Firebase Error:", error.message);
            setErrorMsg(error.message);
        } finally {
            setOperationLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        setOperationLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google Sign-In Success:", result.user);
                setSuccessMsg("Google Sign-In Successful!");
                navigate('/');
            })
            .catch((err) => {
                console.error("Google Sign-In Error:", err);
                setErrorMsg(err.message);
            })
            .finally(() => {
                setOperationLoading(false);
            });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegisterForm}>
                <input type="text" name="fullname" placeholder="Full Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="text" name="photoUrl" placeholder="Photo URL" />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" required />

                <button type="submit" disabled={operationLoading}>
                    {operationLoading ? "Registering..." : "Register"}
                </button>
            </form>

            <button onClick={handleGoogleRegister} className="btn-google">
                Register with Google
            </button>

            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
        </div>
    );
};

export default Register;
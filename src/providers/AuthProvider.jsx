import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const createUserwithPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInwithEmailPass = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const handleSignOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        createUserwithPass,
        signInwithEmailPass,
        handleSignOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
const handleRegisterForm = async (e) => {
    e.preventDefault();

    setSuccessMsg('');
    setErrorMsg('');
    setOperationLoading(true);

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const photoUrl = e.target.photoUrl.value;

    if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match");
        setOperationLoading(false);
        return;
    }

    if (!passwordRegex.test(password)) {
        setErrorMsg("Password must be strong.");
        setOperationLoading(false);
        return;
    }

    try {
        const result = await createUserwithPass(email, password);

        await updateProfile(result.user, {
            displayName: fullname,
            photoURL: photoUrl
        });

        await sendEmailVerification(result.user);

        e.target.reset();

        await Swal.fire({
            title: "Registered Successfully!",
            text: "Check your email for verification.",
            icon: "success",
            confirmButtonText: "OK"
        });

        setOperationLoading(false);
        navigate('/');

    } catch (error) {
        setErrorMsg(error.message);
        setOperationLoading(false);
    }
};
export default AuthProvider
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NeutralLogout = () => {
    const { role, logout } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!role) {
            return;
        }
        const performLogout = async () => {
            const redirectPath =
                role === "teacher"
                    ? "/teacherlogin"
                    : "/login";

            await logout();
            navigate(redirectPath, { replace: true });
        };
        performLogout();
    }, [logout, navigate, role]);

    return null;
};

export default NeutralLogout;
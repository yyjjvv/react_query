import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import anonymousUserIcon from "../assets/person.png";
import { QUERY_KEYS, USERNAMES } from "../values";
import { getUserInfo } from "../api";
import { LoginContext } from "../context/LoginContext";
import styles from "./UserMenu.module.css";

import ProfilePhoto from "./ProfilePhoto";

function UserMenu() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const usernames = USERNAMES;
    const { currentUsername, setCurrentUsername } = useContext(LoginContext);
    const { data: currentUserInfo } = useQuery({
        queryKey: [QUERY_KEYS.USER_INFO, currentUsername],
        queryFn: () => getUserInfo(currentUsername),
        staleTime: 60 * 1000 * 60,
        enabled: !!currentUsername,
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutsideOfMenu = () => setIsMenuOpen(false);
        window.addEventListener("click", handleClickOutsideOfMenu);

        return () => {
            window.removeEventListener("click", handleClickOutsideOfMenu);
        };
    }, [isMenuOpen]);

    const handleButtonClick = useCallback((e) => {
        e.stopPropagation();
        setIsMenuOpen((nextIsOpen) => !nextIsOpen);
    }, []);

    const handleLoginClick = (username) => {
        setCurrentUsername(username);
        navigate("/");
    };

    const handleLogoutClick = () => {
        queryClient.removeQueries({
            queryKey: [QUERY_KEYS.USER_INFO, currentUsername],
        });
        setCurrentUsername(undefined);
        navigate("/");
    };

    const userPhoto = currentUserInfo
        ? currentUserInfo.photo
        : anonymousUserIcon;
    const userName = currentUserInfo ? currentUserInfo.name : "로그인";

    return (
        <div className={styles.userMenu}>
            <button className={styles.iconButton} onClick={handleButtonClick}>
                <ProfilePhoto photo={userPhoto} name={userName} />
                <div className={styles.userName}>{userName}</div>
            </button>
            {isMenuOpen && (
                <ul className={styles.popup}>
                    {currentUsername ? (
                        <li onClick={() => handleLogoutClick()}>로그아웃</li>
                    ) : (
                        usernames.map((username) => (
                            <li
                                key={username}
                                onClick={() => handleLoginClick(username)}
                            >
                                {username}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default UserMenu;

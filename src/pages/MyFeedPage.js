// packages
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
// customed files
import { LoginContext } from "../context/LoginContext";
import { FEED_VARIANT } from "../values";
import styles from "./MyFeedPage.module.css";
// components
import PostList from "../components/PostList";
import Container from "../components/Container";
import NotLoggedInPage from "./NotLoggedInPage";

function MyFeedPage() {
    const { currentUsername } = useContext(LoginContext);

    if (!currentUsername) return <NotLoggedInPage />;

    return (
        <Container className={styles.container}>
            <ToastContainer position="top-center" autoClose={2000} />
            <PostList variant={FEED_VARIANT.MY_FEED} showPostForm={true} />
        </Container>
    );
}

export default MyFeedPage;

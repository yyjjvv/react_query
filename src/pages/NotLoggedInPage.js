import { Link } from "react-router-dom";
// style
import styles from "./NotLoggedInPage.module.css";
// components
import Button from "../components/Button";
import Container from "../components/Container";
import Warn from "../components/Warn";

function NotLoggedInPage() {
    return (
        <Container className={styles.container}>
            <Warn
                variant="big"
                title="로그인이 필요합니다."
                description="로그인을 먼저 해주세요."
            />
            <div className={styles.link}>
                <Link to="/">
                    <Button as="div">홈으로 가기</Button>
                </Link>
            </div>
        </Container>
    );
}

export default NotLoggedInPage;

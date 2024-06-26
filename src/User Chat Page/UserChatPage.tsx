import MainWrapper from "../Main Components/MainWrapper";
import UserNavigation from "../Main Components/UserNavigation";
import UserChatBox from "./User Chat Components/UserChatBox";
import UserChats from "./User Chat Components/UserChats";
import "./UserChatPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../Store-Redux/LogoutReducer";
import Modal from "../Main Components/Modal";
import LogoutModal from "../Main Components/LogoutModal";

function UserChatPage() {
  const logoutInitialState = useSelector(
    (state: any) => state.logout.logoutIsOpen
  );
  const dispatch = useDispatch();

  return (
    <>
      {logoutInitialState && (
        <Modal onClose={() => dispatch(setLogout(false))}>
          <LogoutModal />
        </Modal>
      )}
      <MainWrapper>
        <div className="user-chat-main">
          <UserNavigation />
          <UserChatBox />
          <UserChats />
        </div>
      </MainWrapper>
    </>
  );
}

export default UserChatPage;

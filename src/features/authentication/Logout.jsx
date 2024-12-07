import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import Modal from "../../ui/Modal";
import ConfirmLogout from "../../ui/ConfirmLogout";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <Modal>
      <Modal.Open opens="logout">
        <ButtonIcon>
          <HiArrowRightOnRectangle />
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="logout">
        <ConfirmLogout
          resourceName="Logout"
          disabled={isLoading}
          onConfirm={logout}
        />
      </Modal.Window>
    </Modal>
  );
}

export default Logout;

{
  /* <ButtonIcon disabled={isLoading} onClick={logout}>
{!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
</ButtonIcon> */
}

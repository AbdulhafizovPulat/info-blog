import { useDispatch, useSelector } from "react-redux";
import { modalInvisible, followMe, unFollowMe } from "../slice/profile";
import ProfileServices from "../services/profile";

const ModalProfile = () => {
  const dispatch = useDispatch();
  const { user, following } = useSelector((state) => state.profile);

  const closeHandler = () => {
    dispatch(modalInvisible());
    document.body.style.overflow = "";
  };

  const follow = async () => {
    try {
      await ProfileServices.postFollow(user.username);
      dispatch(followMe());
    } catch (error) {
      console.log(error);
    }
  };

  const unFollow = async () => {
    try {
      await ProfileServices.deleteFollow(user.username);
      dispatch(unFollowMe());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal modal-sheet z-3 position-absolute rounded-3 d-block p-4 mt-5 "
      tabIndex="2"
      role="dialog"
      id="modalSheet"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header border-bottom-0">
            <h1 className="modal-title fs-5">My Profile</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeHandler}
            ></button>
          </div>
          <div className="modal-body py-0 d-flex gap-5">
            <img src={user.image} alt="img" className="w-25" />
            <div className="w-50">
              <p>{user.username}</p>
              <p>{user.bio}</p>
              <p>{`Your following me? - ${user.following ? "Yes" : "No"}`}</p>
              {following ? (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-info"
                  onClick={unFollow}
                >
                  unfollow
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  onClick={follow}
                >
                  follow
                </button>
              )}
            </div>
          </div>
          <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <button
              type="button"
              className="btn btn-lg btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeHandler}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;

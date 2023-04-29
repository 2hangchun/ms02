import { Descriptions, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selector as userSelector, fetchAvatar } from "@/store/userSlice";
import { useEffect } from "react";

const Info = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("/api/upload", {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  useEffect(() => {
    dispatch(fetchAvatar());
  }, []);

  return (
    <>
      <Descriptions title="User Info" column={1}>
        <Descriptions.Item label="avatar">
          {/* <Avatar
            size={64}
            src={"https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"}
          /> */}
          <Avatar size={64} src={`http://localhost:1337${user.avatar}`} />
        </Descriptions.Item>
        <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Telephone">
          {user.telephone}
        </Descriptions.Item>
        <Descriptions.Item label="Live">{user.live}</Descriptions.Item>
        <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
      </Descriptions>
      <form onSubmit={upload}>
        <input type="file" name="files"></input>
        {/* <input type="text" name="name"></input> */}
        <button type="submit">upload</button>
      </form>
    </>
  );
};
export default Info;

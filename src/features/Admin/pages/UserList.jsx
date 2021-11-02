import { Box, Container } from "@material-ui/core";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllUsersAsync } from "../AdminSlice";
import UserListResults from "../ComponentAdmin/User/UserListResults";
import UserListToolbar from "../ComponentAdmin/User/UserListToolbar";

const UserList = () => {
  const { userList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);
  const location = useLocation();
  return (
    <>
      <Helmet>
        <title>List Players</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar />
          <Box sx={{ pt: 3 }}>
            {userList && <UserListResults userList={userList} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UserList;
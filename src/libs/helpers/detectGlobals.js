export default () => ({
  userId: window.gon.current_user_id,
  userName: window.gon.current_username,
  userFullName: window.gon.current_user_fullname,
  userAvatar: window.gon.current_user_avatar_url,
});

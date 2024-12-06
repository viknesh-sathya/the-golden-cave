import supabase, { supabaseUrl } from "./supabase";

// SIGN-UP
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

// LOGIN
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  // console.log(data);
  return data;
}

// Checking the current User active/not
export async function getCurrentUser() {
  // First check for the active session
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  // We might think we can get the user from the session but its bit more secure to redownload from supabase
  const { data, error } = await supabase.auth.getUser();

  // console.log(data);
  if (error) throw new Error(error.message);
  return data?.user;
}

// LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  // this doesn't returns anything
}

// UPDATE THE AVATAR AND PASSWORD
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullName (both not at same time as both are coming from different forms)
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } }; // refer the signup function above

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3.Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}

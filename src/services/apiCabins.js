import supabase, { supabaseUrl } from "./supabase";

export async function createEditCabin(newCabin, id) {
  // we have a single form for both edit and new. so if its a new image then it will give the image file and from that we have to pick ans set the URL but if its an existing image we can simply use the URL
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
    // this replace will remove all the'/' or else supabase will create subfolders based on '/'
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. CREATE/EDIT CABIN
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single(); // This insert here will not immediately return the row (data), so we use select().single(), which will take tha element out of the array;
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Created");
  }

  if (hasImagePath) return data; // so this will stop us to create same image again
  // 2. UPLOAD IMAGE
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was a error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and Cabin could not be Created"
    );
  }
  return data;
}

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); // here the "id" is the col in supabase which we have set
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Deleted");
  }
  return data;
}

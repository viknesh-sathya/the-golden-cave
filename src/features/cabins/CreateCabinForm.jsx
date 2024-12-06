import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  console.log(errors);
  // Create Mutation
  const { isCreating, createCabin } = useCreateCabin();

  // Edit Mutation
  const { isEditing, editCabin } = useEditCabin();

  // Below is just for loading
  const isWorking = isEditing || isCreating;

  // this data will come from the handleSubmit and has the form data
  function onSubmit(data) {
    //And here also we need to check for the newImage or edited image
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          // Note that even here we can set the onSuccess and this also receives the data which the mutation function returns, here its the createCabin mutate function
          onSuccess: (data) => {
            console.log("data from the editCabin mutate function", data);
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          // Note that even here we can set the onSuccess and this also receives the data which the mutation function returns, here its the createCabin mutate function
          onSuccess: (data) => {
            console.log("data from the createCabin mutate function", data);
            reset();
            onCloseModal?.();
          },
        }
      );
    // console.log(data);
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    // here the onSubmit &onError is our function for the logic and we need to pass it inside the react handlesSubmit fn
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This is a required field" })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This is a required field",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This is a required field",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This is a required field",
            validate: (val) =>
              val <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
        {/* here the validate fn is used for writing custom validation and uses a callback with the value as the i/p value of this filed */}
        {/* And we can also return the error message as above if the validate is false */}
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This is a required field" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          // type="file" we dont need it here because we have it in styled comp attrs({type:"file"}) check it!
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This is a required field",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! and reset will rest the details in the form*/}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()} // So this option chaing here helps us of there is no modal and hence its undefined and it wont call the function and no BUGS
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

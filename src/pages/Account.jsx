import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Filter from "../ui/Filter";
import { useSearchParams } from "react-router-dom";

function Account() {
  const [searchParams] = useSearchParams();
  const isTab1 =
    !searchParams.get("tabs") || searchParams.get("tabs") === "user-data"
      ? true
      : false;
  return (
    <>
      <Heading as="h1">Update your account</Heading>
      <Filter
        filterField="tabs"
        options={[
          { value: "user-data", label: "User Data" },
          { value: "password", label: "Password" },
        ]}
      />

      {isTab1 ? (
        <Row>
          <Heading as="h2">Update user data</Heading>
          <UpdateUserDataForm />
        </Row>
      ) : (
        <Row>
          <Heading as="h2">Update password</Heading>
          <UpdatePasswordForm />
        </Row>
      )}
    </>
  );
}
//   return (
//     <>
//       <Heading as="h1">Update your account</Heading>
//       <Filter
//         filterField="tab"
//         options={[
//           { value: "user-data", label: "User Data" },
//           { value: "password", label: "Password" },
//         ]}
//       />
//       <Row>
//         <Heading as="h2">Update user data</Heading>
//         <UpdateUserDataForm />
//       </Row>

//       <Row>
//         <Heading as="h2">Update password</Heading>
//         <UpdatePasswordForm />
//       </Row>
//     </>
//   );
// }

export default Account;

import authScreenAtom from "../atoms/authAtoms";
import LoginCard from "../components/Login";
import { useRecoilValue } from "recoil";
import SignupCard from "../components/SignupCard";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;

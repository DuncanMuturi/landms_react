import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsLoggedIn = () => {
  const navigation = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  useEffect(() => {
    //check if above are empty
    if (!user_id && !username) {
      console.log("Works");
      localStorage.clear();
      return navigation("/signin"); //Go to sign
    }
  }, [user_id, username, navigation]); //Return them

  //return your variables
  return { username };
};

export default IsLoggedIn;

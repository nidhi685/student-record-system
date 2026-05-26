import {
   createContext,
   useState
} from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext =
   createContext();

export const AuthProvider = ({
   children
}) => {
    const navigate = useNavigate();

   const [user, setUser] = useState(

      JSON.parse(
         localStorage.getItem("user")
      ) || null
   );

   // LOGIN

   const login = (data) => {

      localStorage.setItem(

         "user",

         JSON.stringify(data.user)
      );

      localStorage.setItem(
         "token",
         data.token
      );

      setUser(data.user);
   };

   // LOGOUT

    const logout = () => {

        // remove token & user

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

        // redirect login page

        navigate("/");
    };

   return (

      <AuthContext.Provider
         value={{
            user,
            login,
            logout
         }}
      >

         {children}

      </AuthContext.Provider>
   );
};
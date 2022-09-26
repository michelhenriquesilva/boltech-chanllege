import { useAuth } from "../contexts/auth.context";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes(){
    const { signed } = useAuth()
    console.log(signed)
    return signed ? <AppRoutes /> : <AuthRoutes />
}
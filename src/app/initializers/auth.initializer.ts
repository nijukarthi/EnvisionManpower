import { Auth } from "@/service/auth/auth";
import { Loader } from "@/service/loader/loader";
import { firstValueFrom } from "rxjs";

export function authInitializer(auth: Auth, loader: Loader) {
    return async () => {
        loader.show(0);

        try {
            await firstValueFrom(auth.checkSessionAndNavigate());
        } finally {
            loader.hide();
        }
    };
}
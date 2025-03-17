import { toast } from "react-toastify";

export const successNotifier = (message: string) => toast.success(message);
export const errorNotifier = (message: string) => toast.error(message);
export const infoNotifier = (message: string) => toast.info(message);

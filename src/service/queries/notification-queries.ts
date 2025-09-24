import { requestNotificationPermission } from "@/lib/utils/notifications";
import { useQuery } from "@tanstack/react-query";

export const useNotificationPermissionsQuery = () => {
  return useQuery({
    queryKey: ["notification-permissions"],
    queryFn: requestNotificationPermission,
  });
};

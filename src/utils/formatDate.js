import { format } from "date-fns";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / 60000);

  if (diffInMinutes < 60) {
    return ` ${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return ` ${hours}h ago`;
  } else {
    return ` ${format(date, "dd/MM/yyyy")}`;
  }
};

export default formatDate;

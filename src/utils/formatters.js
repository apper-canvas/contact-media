export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

export const generateAvatar = (name) => {
  const initials = name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
  
  const colors = [
    "#1e3a8a", "#0891b2", "#06b6d4", "#059669", "#dc2626",
    "#7c3aed", "#db2777", "#ea580c", "#65a30d", "#0d9488"
  ];
  
  const colorIndex = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  
  return {
    initials,
    backgroundColor: colors[colorIndex]
  };
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "lead":
      return "bg-yellow-100 text-yellow-800";
    case "negotiation":
      return "bg-blue-100 text-blue-800";
    case "closed-won":
      return "bg-green-100 text-green-800";
    case "closed-lost":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
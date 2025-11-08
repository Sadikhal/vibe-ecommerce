import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

export const formatPrice = (amount) => {
  if (!amount) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD", 
    minimumFractionDigits: 2,
  }).format(amount);
};
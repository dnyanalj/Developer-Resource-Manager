import { z } from "zod";

export const validateEmail = (email) => {
    const emailSchema = z.string().email();
    return emailSchema.safeParse(email).success; // Returns true if valid, false if invalid
  };

export const getInitials = (name) => {
    if (!name) return ""; // Handle empty input

    const words = name.trim().split(" ");
    const initials = words.map(word => word.charAt(0).toUpperCase()).join("");

    return initials;
};

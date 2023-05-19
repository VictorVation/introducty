import { cva } from "class-variance-authority";

export const gradients = {
  "1": ["from-amber-300", "to-rose-400"], // OrangeRed
  "2": ["from-pink-400", "to-rose-400"], // RosePink
  "3": ["from-cyan-300", "to-blue-600"], // Sky
  "4": ["from-emerald-400", "to-cyan-500"], // CyanGreen
  "5": ["from-purple-600", "to-blue-500"], // BluePurple
  "6": ["from-green-400", "to-green-900"], // GreenGreen
  "7": ["from-fuchsia-300", "to-red-400"], // LightPink
  "8": ["from-purple-300", "to-blue-400"], // GreenGreen
  "9": ["from-purple-500", "to-rose-500"], // GreenGreen
};

export type GradientIdsType = keyof typeof gradients;
export const GradientIds = Object.keys(gradients) as Array<GradientIdsType>;

export const gradientVariant = cva(["bg-gradient-to-br"], {
  variants: {
    gradientId: gradients,
  },
});

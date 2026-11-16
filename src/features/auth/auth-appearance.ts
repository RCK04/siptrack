import type { SignIn } from "@clerk/react";
import type { ComponentProps } from "react";
import { palette } from "@/shared/theme/palette";

export const authAppearance = {
  variables: {
    colorPrimary: palette.flow.ink,
    colorForeground: palette.flow.ink,
    colorMutedForeground: palette.flow.muted,
    colorBackground: palette.flow.paper,
    colorInput: "#ffffff",
    colorInputForeground: palette.flow.ink,
    fontFamily: "Onest, sans-serif",
    fontFamilyButtons: "Onest, sans-serif",
    borderRadius: "0.5rem",
  },
  elements: {
    rootBox: "w-full! max-w-full!",
    cardBox: "w-full! max-w-full! shadow-none! border-0! rounded-none! bg-transparent! overflow-visible!",
    card: "w-full! max-w-full! shadow-none! border-0! rounded-none! bg-transparent! p-0! gap-6!",
    headerTitle: "font-display! font-medium! text-flow-ink!",
    headerSubtitle: "text-flow-muted!",
    formButtonPrimary: "min-h-[50px]! rounded-lg! bg-flow-ink! bg-none! shadow-none! hover:bg-teal-700! normal-case! text-sm! font-medium!",
    formFieldInput: "h-14! min-h-14! max-h-none! rounded-lg! border! border-flow-line! bg-white! px-3.5! text-sm! shadow-none! focus:border-teal-700! focus:ring-2! focus:ring-teal-700/15!",
    formFieldLabel: "text-[13px]! font-medium! text-flow-ink!",
    formFieldInputShowPasswordButton: "size-10! text-flow-muted!",
    socialButtonsBlockButton: "min-h-12! rounded-lg! border! border-flow-line! bg-transparent! shadow-none! hover:bg-white!",
    footer: "bg-transparent! bg-none! px-0! pt-6!",
    footerActionLink: "text-flow-ink! hover:text-teal-700!",
  },
} satisfies NonNullable<ComponentProps<typeof SignIn>["appearance"]>;

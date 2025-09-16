import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/_form/OTPInput";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps {
  name: string;
  label?: ReactNode;
  extraLabel?: ReactNode;
  required?: boolean;
}

export function OTPField({ required, name, label, extraLabel }: IProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel extraLabel={extraLabel}>
              {label} {required && <RequiredIndicator />}
            </FormLabel>
          )}
          <FormControl>
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-[61px] w-[61px]" />
                <InputOTPSlot index={1} className="h-[61px] w-[61px]" />
                <InputOTPSlot index={2} className="h-[61px] w-[61px]" />
                <InputOTPSlot index={3} className="h-[61px] w-[61px]" />
                <InputOTPSlot index={4} className="h-[61px] w-[61px]" />
                <InputOTPSlot index={5} className="h-[61px] w-[61px]" />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

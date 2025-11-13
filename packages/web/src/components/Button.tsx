import { forwardRef, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-solana-start to-solana-end text-slate-950 shadow-glow hover:from-solana-end hover:to-zcash focus:ring-solana-end',
  secondary:
    'border border-white/10 bg-white/5 text-white hover:bg-white/10 focus:ring-solana-start',
  ghost: 'text-white/70 hover:text-white focus:ring-white/50'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', ...props },
  ref
) {
  return <button ref={ref} className={clsx(baseStyles, variants[variant], className)} {...props} />;
});


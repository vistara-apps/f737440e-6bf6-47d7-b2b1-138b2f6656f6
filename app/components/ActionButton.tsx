'use client';

interface ActionButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'destructive';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
}

export default function ActionButton({
  children,
  variant,
  onClick,
  disabled = false,
  className = '',
  title,
}: ActionButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return disabled
          ? 'bg-primary/50 text-white/70 cursor-not-allowed'
          : 'btn-primary hover:shadow-lg';
      case 'secondary':
        return disabled
          ? 'bg-surface/50 text-on-surface/50 border-surface/50 cursor-not-allowed'
          : 'btn-secondary';
      case 'destructive':
        return disabled
          ? 'bg-red-500/50 text-white/70 cursor-not-allowed'
          : 'bg-red-500 text-white hover:bg-red-600 border-0 rounded-lg px-4 py-3 font-medium transition-all duration-200';
      default:
        return 'btn-primary';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        ${getVariantClasses()}
        ${className}
        transition-all duration-200
        ${!disabled && 'active:scale-95'}
      `}
    >
      {children}
    </button>
  );
}

export function TasksSeparator({ children }) {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-brand-border pb-1">
      {children}
    </div>
  );
}

export function TaskSeparatorTitle({ children }) {
  return <p className="text-sm text-brand-text-gray">{children}</p>;
}

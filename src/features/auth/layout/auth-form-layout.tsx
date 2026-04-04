import { memo } from "react";

interface IAuthFormLayoutProps {
  title: string;
  children: React.ReactNode;
}

function AuthFormLayout({ title, children }: IAuthFormLayoutProps) {
  return (
    <section className="flex flex-col items-center justify-center px-20 xl:px-38">
      <h3 className="text-3xl font-bold text-gray-800 mr-auto mb-4">{title}</h3>
      <div className="w-full">{children}</div>
    </section>
  );
}

export default memo(AuthFormLayout);

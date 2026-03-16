import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DynamicCardHeaderProps = {
  title: string;
  description?: string;
};

export const DynamicCardHeader = ({
  title,
  description,
}: DynamicCardHeaderProps) => {
  return (
    <CardHeader className="space-y-2 p-0">
      <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </CardTitle>
      {description ? (
        <CardDescription className="text-base leading-7 text-slate-500">
          {description}
        </CardDescription>
      ) : null}
    </CardHeader>
  );
};

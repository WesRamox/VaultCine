"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

export default function DashboardBreadcrumb() {
  const pathname = usePathname();

  // remove vazio e quebra a rota
  const segments = pathname.split("/").filter(Boolean);

  const paths = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return { href, label };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>{<span className="text-muted-foreground">{item.label}</span>}</BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

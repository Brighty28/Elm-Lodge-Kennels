import { FaPaw } from "react-icons/fa6";

export default function PageHeader({
  title,
  align = "left",
}: {
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <FaPaw aria-hidden="true" className="text-xl text-elk-accent" />
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h1>
    </div>
  );
}

export default function AuthHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h1 className="type-h2 text-text">{title}</h1>
      <p className="type-body text-text-muted">{description}</p>
    </div>
  );
}

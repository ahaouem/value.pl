import { moods } from "./mood-picker";

export default function Journal({
  mood,
  dayDesc,
  tags,
}: {
  mood: number;
  dayDesc: string;
  tags: string[];
}) {
  return (
    <div className="prose dark:prose-invert prose-zinc">
      <h2>
        {moods[mood]?.emoji} {moods[mood]?.tooltip}
      </h2>
      <p>{dayDesc}</p>
      <div>Tags:</div>
      <div>
        {tags.map((tag) => (
          <span key={tag} className="rounded-xl bg-emerald-400 px-2 py-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

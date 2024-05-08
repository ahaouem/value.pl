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
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}

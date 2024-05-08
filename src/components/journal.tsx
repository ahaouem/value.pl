import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <div className="mt-3.5 flex flex-col justify-center space-y-6 p-2 sm:p-8">
      <Card>
        <CardHeader>
          <h2 className="text-2xl">
            {moods[mood]?.emoji} {moods[mood]?.tooltip}
          </h2>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div>Tags:</div>
        </CardHeader>
        <CardContent>
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-xl bg-emerald-200 px-2 py-1 text-emerald-800"
            >
              {tag}
            </span>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p>{dayDesc}</p>
        </CardContent>
      </Card>
    </div>
  );
}

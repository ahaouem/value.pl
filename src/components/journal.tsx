import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { moods } from "./mood-picker";

export default function Journal({
  data,
}: {
  data: {
    userId: string;
    date: string;
    id: string;
    created_at: string;
    updated_at: string;
    mood: number;
    notes: string;
    topics: string[];
  };
}) {
  const mood = moods?.[data?.mood ?? 0];
  return (
    <div className="mt-3.5 flex flex-col items-center justify-center space-y-12 p-2 py-16 text-center sm:p-8">
      {/* <div> */}
      <p className="mx-auto gap-2 text-2xl text-muted-foreground">
        On this day, you felt{" "}
        <span className="font-semibold italic text-foreground">
          {mood?.tooltip}
        </span>
        <span className="leading-2 text-4xl- px-2">{mood?.emoji}</span>
      </p>
      {/* </div> */}
      <div className="space-y-6">
        <p className="text-2xl text-muted-foreground">
          And here's what you wrote:
        </p>
        <p className="max-w-lg text-lg italic">
          {data?.notes} amet anim dolore enim aliquip non irure magna anim esse
          sit et officia veniam minim cupidatat incididunt est tempor laboris
          dolore irure occaecat qui id quis Lorem sint ad fugiat cupidatat ad
          anim nostrud nulla incididunt magna sunt Lorem aute proident non
          voluptate qui aliqua consectetur reprehenderit minim ex aliquip duis
          laborum et reprehenderit excepteur sit excepteur consectetur labore
          incididunt enim proident id qui ea nulla aute cillum laboris enim sint
          voluptate veniam consectetur est ex dolor aute commodo sint ut
          incididunt velit incididunt tempor laboris laborum sunt magna velit ea
          officia nisi aute amet excepteur aliquip est cupidatat labore labore
          magna cupidatat elit minim sint cillum ullamco incididunt quis elit
          cupidatat dolor officia et mollit laboris ea sit sit
        </p>
      </div>
      {data?.topics?.length > 0 && (
        <div>
          <p>Valuing {data?.topics?.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
